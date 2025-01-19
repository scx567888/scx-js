import {ScxFetch} from "./ScxFetch.js";
import {inject} from "vue";
import {jsonVoProcessor, setResponseType} from "./ScxReqHelper.js";

/**
 * 针对后台的 JsonVo 和 DataJsonVo 对 ScxFetch 进行一次包装
 * 1, 将 JsonVo.ok() 和 JsonVo.fail() 区分开
 * 2, 解构 JsonVo 返回的 data 字段
 */
class ScxReq {

    scxFetch;

    baseURL;

    constructor(scxFetch) {
        if (scxFetch instanceof ScxFetch) {
            this.scxFetch = scxFetch;
        } else {
            this.scxFetch = new ScxFetch(scxFetch);
        }
        this.baseURL = this.scxFetch.baseURL;
    }

    /**
     * GET 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    get(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.get(url, body, setResponseType(options)));
    }

    /**
     * POST 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    post(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.post(url, body, setResponseType(options)));
    }

    /**
     * PUT 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    put(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.put(url, body, setResponseType(options)));
    }

    /**
     * DELETE 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return jsonVoProcessor(this.scxFetch.delete(url, body, setResponseType(options)));
    }


    install(app) {
        app.provide(scxReqKey, this);
    }

}


/**
 *
 * @type {string}
 */
const scxReqKey = "scx-req";

/**
 *
 * @returns {ScxReq}
 */
function useScxReq() {
    return inject(scxReqKey);
}

export {ScxReq, useScxReq};
