import NProgress from "nprogress";
import {createRouter, createWebHashHistory} from "vue-router";
import {inject} from "vue";

/**
 * 获取路由 title
 * @param route
 * @returns {String}
 */
function getRouteTitle(route) {
    return route.meta && route.meta.title ? route.meta.title : route.name;
}

/**
 * 获取路由 排序
 * @param route
 * @return {Number}
 */
function getRouteOrder(route) {
    return route.meta && route.meta.order ? route.meta.order : 0;
}

/**
 *  是否需要登录
 *  @param route
 * @return {boolean}
 */
function routeNoNeedLogin(route) {
    return route.meta && route.meta.noNeedLogin === true;
}

/**
 *  是否需要权限
 * @param route
 * @return {boolean}
 */
function routeNoNeedPerm(route) {
    return route.meta && route.meta.noNeedPerm === true;
}

/**
 *  是否可以在启动器中访问 1, 是最终节点(没有 children) 2, 没有开启 hiddenInLauncher
 *  @param route
 * @return {boolean}
 */
function routeCanShowInLauncher(route) {
    return route.children.length === 0 && !(route.meta && route.meta.hiddenInLauncher === true);
}

function routeCanShowInMenu(route) {
    return !(route.meta && route.meta.hiddenInLauncher === true);
}

function sortRoutes(l) {
    return l.sort((v1, v2) => getRouteOrder(v1) - getRouteOrder(v2));
}


/**
 * 为路由设置 order
 * @param r
 */
function setRoutesOrder(r) {
    let i = 0;

    function setRoutesOrder0(r0) {
        for (let e of r0) {
            if (!e.meta) {
                e.meta = {};
            }
            e.meta.order = i;
            i = i + 1;
            if (e.children) {
                setRoutesOrder0(e.children);
            }
        }
    }

    setRoutesOrder0(r);
    return r;
}

class ScxRouter {
    auth;

    /**
     * @type {Object}
     */
    systemConfig;

    /**
     * @type {Object}
     */
    userConfig;
    userInfo;
    vueRouter;

    constructor(rawOptions = {}) {
        const {
            routes = [],
            auth,
            systemConfig,
            userInfo,
            userConfig,
        } = rawOptions;

        this.auth = auth;
        this.systemConfig = systemConfig;
        this.userInfo = userInfo;
        this.userConfig = userConfig;
        this.vueRouter = createRouter({
            history: this.historyType(),
            routes: setRoutesOrder(routes),
        });
        this.initBeforeEach(this.vueRouter);
        this.initAfterEach(this.vueRouter);
    }

    initBeforeEach(vueRouter) {
        vueRouter.beforeEach(async (to, from) => {
            NProgress.start();
            document.title = this.getPageTitle(to);

            //先校验用户是否登录或令牌是否可用 (若用户已经登录直接放行, 如果没登陆可能是第一次进入页面, 则校验一下 token)
            //此处可能会出现用户 "登录" 了但是 token 已经在后台作废 不过不用担心 因为后台数据的操作都已经做了登录校验 所以此种情况下用户只能看到空白页面而已
            //至于为什么不每次都单独使用 tokenCanUse 作为判断依据而是添加了 alreadyLogged 作为辅助校验项 主要是从性能考虑
            //毕竟每次切换页面都进行一次 token 是否可用的校验 (会走一次 http 请求) 对性能有很大影响
            const b = this.auth.alreadyLogged() ? true : await this.auth.tokenCanUse();

            if (b) {
                if (to.name === "login") {//针对 login 页面做特殊处理
                    return this.getRedirectRouteFromLoginRoute(to);
                }
                //不在白名单的判断是否有权限访问 没有返回 无权限页面
                if (this.canAccessThisRoute(to)) {
                    return true;
                }
                return routeNoNeedPerm(to) ? true : this.getNoPermRoute();
            } else {//token 不可用移除 失效的token 并清除用户信息
                //todo 因为已经失效 移不移除 应该没啥区别 this.auth.removeToken();
                this.auth.resetUserInfo();
                if (to.name === "login") { //针对 login 页面做特殊处理 防止无限重定向
                    return true;
                }
                return routeNoNeedLogin(to) ? true : this.getLoginRoute(to);
            }
        });
    }

    initAfterEach(vueRouter) {
        vueRouter.afterEach((to, from) => {
            NProgress.done();
        });
    }

    historyType() {
        return createWebHashHistory();
    }

    getVueRouter() {
        return this.vueRouter;
    }

    /**
     *翻译 顶部的 title
     * @param route
     */
    getPageTitle(route) {
        return `${getRouteTitle(route)} - ${this.systemConfig.title}`;
    }

    /**
     * 是否可以访问这个路由
     * @returns {boolean}
     * @param route
     */
    canAccessThisRoute(route) {
        //先校验是否存在于白名单中
        const onWhiteList = routeNoNeedLogin(route) || routeNoNeedPerm(route);
        if (onWhiteList) {
            return true;
        }
        if (this.userInfo.user.isAdmin) {
            return true;
        } else {
            return this.userInfo.perms.pagePerms.includes(route.name);
        }
    }

    /**
     * 根据当前路由 获取登录页面的路由 主要是对参数进行了一些特殊处理 保证可以在登陆时直接重定向到登录前的页面
     */
    getLoginRoute({name, query} = {}) {
        const loginQuery = {};
        if (name) {
            loginQuery["redirect-name"] = name;
        }
        if (query && Object.keys(query).length > 0) {
            loginQuery["redirect-query"] = JSON.stringify(query);
        }
        return {name: "login", query: loginQuery};
    }

    getNoPermRoute() {
        return {name: "no-perm"};
    }

    /**
     * 解析 getLoginRoute 生成的 登录页面的路由 并返回应该重定向的页面
     * 1, 没有重定向参数 -> 返回 home 页
     * 2, 有重定向参数 但是参数有误 (无此路由) -> 返回 not-found 页
     * 3, 有重定向页并且参数正确 -> 重定向到正确的页面并携带参数
     * @param query
     * @returns {{query: null, name: string}}
     */
    getRedirectRouteFromLoginRoute({query}) {
        const queryRedirectName = query["redirect-name"];
        const queryRedirectQuery = query["redirect-query"];
        let redirectName = "home";
        let redirectQuery = null;
        if (queryRedirectName) {
            if (this.vueRouter.hasRoute(queryRedirectName)) {
                redirectName = queryRedirectName;
                if (queryRedirectQuery) {
                    try {
                        redirectQuery = JSON.parse(queryRedirectQuery);
                    } catch (e) {
                        console.warn("处理重定向参数时发生错误 :　" + e);
                    }
                }
            } else {
                redirectName = "not-found";
            }
        }
        return {name: redirectName, query: redirectQuery};
    }

    getRoutes() {
        return sortRoutes(this.vueRouter.getRoutes());
    }

    install(app) {
        this.vueRouter.install(app);
        app.provide(scxRouterKey, this);
    }

}

/**
 *
 * @type {string}
 */
const scxRouterKey = "scx-router";

/**
 *
 * @returns {ScxRouter}
 */
function useScxRouter() {
    return inject(scxRouterKey);
}

export {
    ScxRouter,
    useScxRouter,
    getRouteTitle,
    getRouteOrder,
    routeNoNeedLogin,
    routeNoNeedPerm,
    routeCanShowInLauncher,
    routeCanShowInMenu,
    sortRoutes,
    setRoutesOrder,
};
