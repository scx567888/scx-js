import {LoginRoute, NoPermRoute, NotFoundRoute, PathMatchRoute} from "@scx-js/scx-admin";

/**
 * 全部路由
 * @type {ScxRoute[]}
 */
const routes = [
    LoginRoute,
    {
        path: "/",
        name: "app",
        component: () => import("@scx-js/scx-admin/layout/index.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("./views/home.vue"),
                meta: {
                    title: "首页",
                    icon: "outlined-home",
                    hiddenInLauncher: false,
                    showInUserPanel: true,
                    noNeedPerm: true,
                },
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("./views/profile.vue"),
                meta: {
                    icon: "outlined-user",
                    title: "用户中心",
                    hiddenInLauncher: true,
                    showInUserPanel: true,
                },
            },
            {
                path: "a1",
                name: "a1",
                component: () => import("./views/a1.vue"),
                meta: {
                    title: "A1",
                    icon: "filled-dashboard",
                    perms: [],
                },
            },
            {
                path: "a2",
                name: "a2",
                component: () => import("./views/a2.vue"),
                meta: {
                    title: "A2",
                    icon: "filled-dashboard",
                    perms: [],
                },
            },
            {
                path: "a3",
                name: "a3",
                component: () => import("./views/a3.vue"),
                meta: {
                    title: "A3",
                    icon: "filled-dashboard",
                    perms: [],
                },
            },
        ],
    },
    NotFoundRoute,
    NoPermRoute,
    PathMatchRoute,
];

export {
    routes,
};
