import {ScxFetchResponseType} from "./ScxFetchResponseType.js";

/**
 * ScxFetch 响应体
 */
class ScxFetchResponse {

    headers;
    type;
    url;
    responseType;
    body;

    constructor(headers, type, url, body, responseType) {
        this.headers = headers;
        this.type = type;
        this.url = url;
        this.body = body;
        this.responseType = responseType;
    }

    /**
     * 根据 响应类型 获取对应的 body 处理器
     * @param responseType
     * @param response
     * @return {Promise<ArrayBuffer>|ArrayBuffer|Promise<Blob>|Blob|*|Promise<FormData>}
     */
    static getBodyPromise(responseType, response) {
        if (responseType === ScxFetchResponseType.JSON) {
            return response.json();
        } else if (responseType === ScxFetchResponseType.ARRAY_BUFFER) {
            return response.arrayBuffer();
        } else if (responseType === ScxFetchResponseType.BLOB) {
            return response.blob();
        } else if (responseType === ScxFetchResponseType.FORM_DATA) {
            return response.formData();
        } else if (responseType === ScxFetchResponseType.TEXT) {
            return response.text();
        } else {
            return response.arrayBuffer();
        }
    }

    /**
     * 创建 ScxFetchResponse
     * @param response
     * @param defaultResponseType
     * @param useBodyPromise
     * @return {Promise<unknown>}
     */
    static create(response, defaultResponseType, useBodyPromise) {
        return new Promise((resolve, reject) => {
            const responseType = ScxFetchResponseType.getByHeaders(response.headers, defaultResponseType);
            if (useBodyPromise) {
                resolve(new ScxFetchResponse(response.headers, response.type, response.url, ScxFetchResponse.getBodyPromise(responseType, response), responseType));
            } else {
                ScxFetchResponse.getBodyPromise(responseType, response)
                        .then(body => resolve(new ScxFetchResponse(response.headers, response.type, response.url, body, responseType)))
                        .catch(e => reject(e));
            }
        });
    }

}

export {
    ScxFetchResponse,
};
