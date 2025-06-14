class FSSObject {
    fssObjectID;//文件的 id
    fileName;//文件的名称
    uploadTime;//上传时间
    fileHash;//文件 hash
    fileSizeDisplay;//文件大小 格式化值
    fileSize;//文件大小
    fileExtension;//文件拓展名

    constructor({
                    fssObjectID,
                    fileName,
                    uploadTime,
                    fileHash,
                    fileSizeDisplay,
                    fileSize,
                    fileExtension,
                }) {
        this.fssObjectID = fssObjectID;
        this.fileName = fileName;
        this.uploadTime = uploadTime;
        this.fileHash = fileHash;
        this.fileSizeDisplay = fileSizeDisplay;
        this.fileSize = fileSize;
        this.fileExtension = fileExtension;
    }
}

export {FSSObject};
