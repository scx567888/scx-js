class ScxFetchOptions {

    /**
     * 方法
     */
    method;

    /**
     * 请求头
     */
    headers;

    /**
     * 默认想如何处理返回值 取值如下 [auto, arrayBuffer, blob, formData, json, text, ]
     *
     */
    responseType;

    /**
     * 是否使用 BodyPromise 如果为 true 则 body 为 Promise 对象, false 则会将 body 数据读完再返回
     * @type {boolean}
     */
    useBodyPromise;

    /**
     * 前置处理器
     * @type {boolean}
     */
    usePreInterceptor;

    /**
     * 后置处理器
     * @type {boolean}
     */
    usePostInterceptor;

    /**
     * 字符集
     */
    charset;
}

export {
    ScxFetchOptions,
};
