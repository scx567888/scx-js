import {inject} from "vue";

/**
 * 用户信息类
 */
class ScxAuthInfo {

    loginStatus = false; // 登录状态	
    user = {}; // 用户 id
    perms = {};//权限

    reset() {
        this.user = {};
        this.perms = {};
    }

    fill(rawOptions) {
        this.user = rawOptions.user;
        this.perms = rawOptions.perms;
        return this;
    }

    install(app) {
        app.provide(scxUserInfoKey, this);
    }

}


/**
 *
 * @type {string}
 */
const scxUserInfoKey = "scx-user-info";

/**
 *
 * @returns {ScxAuthInfo}
 */
function useScxUserInfo() {
    return inject(scxUserInfoKey);
}

export {
    ScxAuthInfo,
    useScxUserInfo,
    scxUserInfoKey,
};	
