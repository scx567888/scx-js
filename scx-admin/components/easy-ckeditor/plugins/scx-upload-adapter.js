class ScxUploadAdapter {

    constructor(loader, fss) {
        this.loader = loader;
        this.fss = fss;
    }

    async upload() {

        const needUploadFile = await this.loader.file;

        const c = await this.fss.upload(needUploadFile, (type, v) => {
            //这里为了使计算 md5 和 上传各占一半的进度所以这里做一点特殊的计算
            if (type === "checking-md5") {
                this.loader.uploadedPercent = v / 2;
            } else if (type === "uploading") {
                this.loader.uploadedPercent = 50 + v / 2;
            }
        });

        this.loader.uploadedPercent = 100;

        return {
            default: this.fss.joinImageURL(c.item.fssObjectID),
        };
    }
}

function createScxUploadAdapterPlugin(fss) {
    return function (editor) {
        return editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
            return new ScxUploadAdapter(loader, fss);
        };
    };
}

export {
    createScxUploadAdapterPlugin,
};
