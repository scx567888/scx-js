<template>

    <el-menu :collapse="userConfig.menuCollapse" :collapse-transition="false" :default-active="activeMenu"
             :router="true">
        <scx-menu-item v-for="i in canAccessRoutes" :data="i"/>
    </el-menu>

</template>
<script>
import {getRouteTitle, useScxRouter, useScxSystemConfig, useScxUserConfig} from "../scx/index.js";
import {useRoute} from "vue-router";
import {computed} from "vue";
import ScxMenuItem from "./scx-menu-item.vue";

export default {
    name: "scx-menu",
    components: {
        ScxMenuItem,
    },
    setup() {
        const systemConfig = useScxSystemConfig();
        const userConfig = useScxUserConfig();
        const scxRouter = useScxRouter();

        const route = useRoute();

        //所有能够被展示的路由 1, 是最终节点(没有 children) 2, 没有开启 hiddenInLauncher
        const appRoute = scxRouter.getRoutes().find(c => c.name === "app");

        const allRoutes = appRoute.children;

        //当前路由
        const activeMenu = computed(() => route.name);
        //用户可以访问的路由
        const canAccessRoutes = computed(() => allRoutes.filter((c) => scxRouter.canAccessThisRoute(c)));

        return {
            systemConfig,
            activeMenu,
            getRouteTitle,
            scxRouter,
            allRoutes,
            userConfig,
            canAccessRoutes
        };
    }
};
</script>
<style>
.el-menu .scx-icon {
    fill: currentColor;
    flex-shrink: 0;
}

.collapse .el-menu {
    width: 54px;
}

.el-sub-menu__title {
    padding-right: 0;
}

.el-menu {
    box-sizing: border-box;
    border-right: unset;
    width: 200px;

    --el-menu-active-color: var(--scx-theme);
    --el-menu-hover-text-color: var(--scx-theme);
    --el-menu-bg-color: var(--scx-overlay-bg);
    --el-menu-hover-bg-color: var(--scx-theme-bg);
    --el-menu-item-height: 40px;
    --el-menu-sub-item-height: 40px;
    --el-menu-horizontal-sub-item-height: 36px;
}

.el-menu-item.is-active {
    background-color: var(--scx-theme-bg);
}

.el-sub-menu .el-menu {
    background-color: var(--scx-bg);
}

.el-sub-menu.is-active > .el-sub-menu__title,
.el-menu-item.is-active {
    font-weight: 600;
    color: var(--scx-theme);
}

/* 菜单文字 */
.el-sub-menu__title,
.el-menu-item {
    transition: background-color 100ms;
    column-gap: 20px;
}

/* 左侧火柴条 */
.el-sub-menu__title::before,
.el-menu-item::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    height: 0;
    width: 100%;
    transition: all 150ms;
}

/* 左侧火柴条 */
.el-menu-item.is-active::before,
    /* 父菜单展开时 不需要有火柴条 */
.el-sub-menu.is-active:not(.is-opened) > .el-sub-menu__title::before,
    /* 处理折叠时展开 */
.el-menu--collapse .el-sub-menu.is-active > .el-sub-menu__title::before,
.el-sub-menu__title:hover::before,
.el-menu-item:hover::before {
    top: 0;
    border-left: 2px solid var(--scx-theme);
    height: 100%;
}
</style>
