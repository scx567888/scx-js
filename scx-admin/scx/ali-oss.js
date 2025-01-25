import { formatFileSize, getChunkAndHash,} from "@scx-js/scx-app-x";
import dayjs from "dayjs/esm/index.js";
import {inject} from "vue";

class AliOSS {

    aliOssClient;

    baseURL;

    constructor(baseURL, aliOssClient) {
        this.baseURL = baseURL;
        this.aliOssClient = aliOssClient;
    }

    upload(needUploadFile, progress) {
        const onProgress = (state, value) => {
            //前 50% 是校验 md5 后 50% 才是真正的文件上传
            if (state === "checking") {
                progress(value * 0.5, "校验中");
            } else if (state === "uploading") {
                progress(50 + value * 0.5, "上传中");
            }
        };
        return new Promise((resolve, reject) => {
            if (needUploadFile == null || !(needUploadFile instanceof File)) {
                reject("文件不能为空并且类型必须为文件 !!!");
                return;
            }
            getChunkAndHash(needUploadFile, onProgress, needUploadFile.size).then(chunkAndMD5 => {
                const now = new Date();
                const path = []; //这里路径和 scx-fss 保持一致 年+月+日+MD5+真实文件名
                path.push(now.getFullYear());
                path.push(now.getMonth() + 1);
                path.push(now.getDate());
                path.push(chunkAndMD5.hash);
                path.push(needUploadFile.name);
                onProgress("uploading", 0);
                this.aliOssClient.put(path.join("/"), needUploadFile)
                        .then(res => {
                            onProgress("uploading", 100);
                            resolve(res.name);
                        });
            }).catch(e => reject(e));
        });
    }

    info(fileID) {
        const previewURL = this.joinURL(fileID) + "?x-oss-process=image/resize,w_150";
        const downloadURL = this.joinURL(fileID);
        const fileName = fileID.substring(fileID.lastIndexOf("/") + 1);

        return new Promise((resolve, reject) => {
            this.aliOssClient.getObjectMeta(fileID).then(m => {
                const headers = m.res.headers;
                const fileSizeDisplay = formatFileSize(headers["content-length"]);
                const uploadTime = dayjs(headers["last-modified"]).format("YYYY-MM-DD HH:mm:ss");
                resolve({fileName, previewURL, downloadURL, uploadTime, fileSizeDisplay});
            });
        });
    }

    joinURL(fileName) {
        return joinURL(this.baseURL, fileName);
    }

    install(app) {
        app.provide(aliOSSKey, this);
    }

}

/**
 *
 * @type {string}
 */
const aliOSSKey = "ali-oss";

/**
 *
 * @returns {AliOSS}
 */
function useAliOSS() {
    return inject(aliOSSKey);
}

export {AliOSS, useAliOSS};
