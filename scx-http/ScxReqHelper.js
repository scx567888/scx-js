import {isNull} from "@scx-js/scx-common";
import {ScxFetchResponseType} from "./ScxFetchResponseType.js";
import {ScxFetchPromise} from "./ScxFetchPromise.js";
import {JsonVOError} from "./JsonVOError.js";

/**
 * 通过 scx-req 发送的请求我们默认都是 json 格式的
 * @param {ScxFetchOptions} options
 * @returns {ScxFetchOptions}
 */
function setResponseType(options = {}) {
    if (isNull(options.responseType)) {
        options.responseType = ScxFetchResponseType.JSON;
    }
    return options;
}


function jsonVoProcessor(r) {
    //这里是特殊处理
    const result = new ScxFetchPromise((resolve, reject) => r.then(res => {
        const {
            responseType,
            body,
        } = res;
        if (responseType === ScxFetchResponseType.JSON) {
            if (body.message === "ok") {
                resolve(body.data);
            } else {
                reject(new JsonVOError(body));
            }
        } else {
            resolve(res);
        }
    }).catch(error => reject(error)));

    result.abortController = r.abortController;

    return result;
}

export {
    setResponseType,
    jsonVoProcessor,
};
