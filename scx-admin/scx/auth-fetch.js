import {ResponseNotOKError, ScxFetch, ScxFetchResponseType} from "@scx-js/scx-http";
import {ElMessage, ElMessageBox} from "element-plus";

class AuthFetch extends ScxFetch {

    scxAuth;

    /**
     * 防止弹出多个提示框
     */
    messageLock;

    constructor(baseURL, scxAuth) {
        super(baseURL);
        this.scxAuth = scxAuth;
        this.defaultOptions.responseType = ScxFetchResponseType.JSON;
        this.defaultOptions.usePreInterceptor = true;
        this.defaultOptions.usePostInterceptor = true;
    }

    /**
     * 这里重写前置拦截器以便传送请求头
     * @param request
     * @returns {RequestInit}
     */
    preInterceptor(request) {
        const authHeaders = this.scxAuth.AuthHeaders();
        for (let key in authHeaders) {
            request.headers.set(key, authHeaders[key]);
        }
        return request;
    }

    postInterceptor(response) {
        return new Promise((resolve, reject) => response.then(v => resolve(v)).catch(error => {
            if (error instanceof ResponseNotOKError) {
                //此处针对一些常见的 错误进行处理 例如 权限问题
                const status = error.cause.status;
                if (status === 401) {
                    if (!this.messageLock) {
                        this.messageLock = true;
                        ElMessageBox.confirm("您已经被登出 !!!", "您已经被登出 !!!", {
                            confirmButtonText: "重新登录", cancelButtonText: "取消", type: "warning",
                        }).then(() => {
                            this.scxAuth.removeToken();
                            this.scxAuth.resetUserInfo();
                            location.reload();
                        }).catch(e => {
                            console.error(e);
                        }).finally(() => {
                            this.messageLock = false;
                        });
                    }
                } else if (status === 403) {
                    ElMessage.warning("您没有权限进行该操作 !!!");
                } else if (status === 500) {
                    ElMessage.error("服务器端发生错误 !!!");
                }
            }
            reject(error);
        }));
    }

}

export {
    AuthFetch,
};
