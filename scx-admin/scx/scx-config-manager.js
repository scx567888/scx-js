import {inject} from "vue";

/**
 *
 * @type {string}
 */
const scxSystemConfigKey = "scx-system-config";

/**
 *
 * @type {string}
 */
const scxUserConfigKey = "scx-user-config";

/**
 * a
 * @type {string}
 */
const scxConfigManagerKey = "scx-config-manager";


/**
 * 配置管理器
 */
class ScxConfigManager {

    req;

    systemConfig;

    userConfig;

    /**
     *
     * @param req {ScxReq}

     * @param systemConfig {Object}
     * @param userConfig {Object}
     */
    constructor(req, systemConfig, userConfig) {
        this.req = req;
        this.systemConfig = systemConfig;
        this.userConfig = userConfig;
    }

    startWatch() {
        return this;
    }

    onSystemConfigChange(event) {
        return this;
    }

    onUserConfigChange(event) {
        return this;
    }

    updateSystemConfig(newSystemConfig) {
        return this.req.put("api/system-config", newSystemConfig);
    }

    updateUserConfig(newUserConfig) {
        return this.req.put("api/user-config", newUserConfig);
    }

    install(app) {
        app.provide(scxConfigManagerKey, this);
        app.provide(scxSystemConfigKey, this.systemConfig);
        app.provide(scxUserConfigKey, this.userConfig);
    }

}


/**
 *
 * @returns {Object}
 */
function useScxSystemConfig() {
    return inject(scxSystemConfigKey);
}

/**
 *
 * @returns {Object}
 */
function useScxUserConfig() {
    return inject(scxUserConfigKey);
}


/**
 *
 * @return {ScxConfigManager}
 */
function useScxConfigManager() {
    return inject(scxConfigManagerKey);
}

export {
    ScxConfigManager,
    useScxSystemConfig,
    useScxUserConfig,
    useScxConfigManager,
};
