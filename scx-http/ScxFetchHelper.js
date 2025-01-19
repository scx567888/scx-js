import {notNull} from "@scx-js/scx-common";
import {ScxFetchOptions} from "./ScxFetchOptions.js";
import {HttpMethod} from "./HttpMethod.js";
import {ScxFetchResponseType} from "./ScxFetchResponseType.js";
import {HttpFieldName} from "./HttpFieldName.js";
import {MediaType} from "./MediaType.js";

function createRequestInit(method) {
    return {
        method,
        headers: new Headers(),
        credentials: "include",
        body: null,
    };
}

function setMethod(method, options = {}) {
    options.method = method;
    return options;
}

function setRequestHeaders(requestInit, headers) {
    //循环设置 headers
    if (notNull(headers)) {
        if (headers instanceof Headers) {
            headers.forEach((k, v) => requestInit.headers.set(k, v));
        } else {
            for (const [key, value] of Object.entries(headers)) {
                requestInit.headers.set(key, String(value));
            }
        }
    }
}

function setRequestBody(requestInit, body, url, charset) {
    if (notNull(body)) {
        if (body instanceof FormData) {
            requestInit.body = body;
        } else if (requestInit.method === HttpMethod.GET) {
            for (const [key, value] of Object.entries(body)) {
                url.searchParams.set(key, String(value));
            }
        } else {
            requestInit.headers.set(HttpFieldName.CONTENT_TYPE, `${MediaType.APPLICATION_JSON};charset=${charset}`);
            requestInit.body = JSON.stringify(body);
        }
    }
}

function mixinOptions(defaultOptions, options) {
    return {...defaultOptions, ...options};
}

function initDefaultOptions() {
    const temp = new ScxFetchOptions();
    temp.method = HttpMethod.GET;
    temp.headers = null;
    temp.responseType = ScxFetchResponseType.AUTO;
    temp.useBodyPromise = false;
    temp.usePreInterceptor = false;
    temp.usePostInterceptor = false;
    temp.charset = "utf-8";
    return temp;
}

export {
    createRequestInit,
    setMethod,
    setRequestHeaders,
    setRequestBody,
    mixinOptions,
    initDefaultOptions,
};
