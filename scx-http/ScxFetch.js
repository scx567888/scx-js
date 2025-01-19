import {notNull} from "@scx-js/scx-common";
import {inject} from "vue";
import {
    createRequestInit,
    initDefaultOptions,
    mixinOptions,
    setMethod,
    setRequestBody,
    setRequestHeaders,
} from "./ScxFetchHelper.js";
import {ScxFetchPromise} from "./ScxFetchPromise.js";
import {ScxFetchResponse} from "./ScxFetchResponse.js";
import {ResponseNotOKError} from "./ResponseNotOKError.js";
import {FetchError} from "./FetchError.js";
import {HttpMethod} from "./HttpMethod.js";

/**
 *  ScxFetch : 针对 fetch 的简单封装
 */
class ScxFetch {

    /**
     * 默认配置
     *
     */
    defaultOptions = initDefaultOptions();

    /**
     * 基本路径
     */
    baseURL;

    /**
     *
     *
     * @param {string|URL} baseURL
     */
    constructor(baseURL = null) {
        if (notNull(baseURL)) {
            this.baseURL = new URL(baseURL);
        }
    }

    /**
     * 基本的 req
     * @param  url {URL | string}
     * @param  body {Object}
     * @param  options {ScxFetchOptions}
     * @returns {ScxFetchPromise<ScxFetchResponse>}
     */
    fetch(url, body = {}, options = {}) {
        const {
            method,
            headers,
            responseType,
            usePreInterceptor,
            usePostInterceptor,
            charset,
            useBodyPromise,
        } = mixinOptions(this.defaultOptions, options);

        const requestInit = createRequestInit(method);//初始化 fetch 参数 , 此处携带 cookie

        const finalURL = notNull(this.baseURL) ? new URL(url, this.baseURL) : new URL(url);//创建 url

        setRequestBody(requestInit, body, finalURL, charset);//设置 body 并根据 body 类型设置请求头

        setRequestHeaders(requestInit, headers);//设置请求头 放在 setRequestBody 后以保证 options 中的 headers 可以覆盖 setRequestBody 中设置的值

        const finalInit = usePreInterceptor ? this.preInterceptor(requestInit) : requestInit;

        //用于取消
        let abortController = new AbortController();
        finalInit.signal = abortController.signal;

        //此处进行特殊处理 1, 处理返回结果 2, 将非 2xx 的状态码表示为错误
        const result = new ScxFetchPromise((resolve, reject) => fetch(finalURL, finalInit).then(res => {
            if (res.ok) {
                // resolve 的参数是 Promise 时会直接调用 参数的 resolve
                resolve(ScxFetchResponse.create(res, responseType, useBodyPromise));
            } else {
                reject(new ResponseNotOKError(res));
            }
        }).catch(error => reject(new FetchError(error))));

        result.abortController = abortController;

        return usePostInterceptor ? this.postInterceptor(result) : result;
    }

    /**
     * 前置处理器
     * @param request {RequestInit}
     * @returns {RequestInit}
     */
    preInterceptor(request) {
        return request;
    }

    /**
     * 后置处理器
     * @param response {ScxFetchPromise<ScxFetchResponse>}
     * @returns {ScxFetchPromise<*>}
     */
    postInterceptor(response) {
        return response;
    }

    /**
     * GET 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    get(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.GET, options));
    }

    /**
     * POST 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    post(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.POST, options));
    }

    /**
     * PUT 方法
     * @param url {URL | string}
     * @param body {Object}
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    put(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.PUT, options));
    }

    /**
     * DELETE 方法
     * @param {URL | string} url
     * @param {Object} body
     * @param options {ScxFetchOptions}
     * @returns {ScxFetchPromise<unknown>}
     */
    delete(url, body = null, options = {}) {
        return this.fetch(url, body, setMethod(HttpMethod.DELETE, options));
    }

    /**
     * For VUE
     * @param app
     */
    install(app) {
        app.provide(scxFetchKey, this);
    }

}

//************* 针对 vue ********************

const scxFetchKey = "scx-fetch";

/**
 *
 * @returns {ScxFetch}
 */
function useScxFetch() {
    return inject(scxFetchKey);
}

export {
    ScxFetch,
    useScxFetch,
};
