<template>

    <!-- 上下结构 -->
    <div class="scx-app">

        <!-- 顶栏 -->
        <scx-navbar>
            <template #left>
                <scx-menu-toggle/>
                <scx-logo/>
            </template>
            <template #right>
                <scx-theme-switch/>
                <scx-user-panel/>
            </template>
        </scx-navbar>

        <!-- 内容区域 -->
        <div class="scx-content">

            <!-- 左侧边栏 -->
            <scx-sidebar :class="userConfig.menuCollapse ? 'collapse' : ''">

                <!-- 菜单栏 -->
                <scx-menu/>

            </scx-sidebar>

            <!-- 右侧主内容容器 -->
            <scx-main/>

        </div>

        <!-- 右侧通知面板 -->
        <scx-notice/>

    </div>
</template>

<script>
import ScxSidebar from "./scx-sidebar.vue";
import ScxMain from "./scx-main.vue";
import ScxNotice from "./scx-notice.vue";
import ScxUserPanel from "./scx-user-panel.vue";
import ScxMenu from "./scx-menu.vue";
import ScxMenuToggle from "./scx-menu-toggle.vue";
import ScxLogo from "./scx-logo.vue";
import ScxNavbar from "./scx-navbar.vue";
import ScxThemeSwitch from "./scx-theme-switch.vue";
import {useScxUserConfig} from "../scx/index.js";

export default {
    name: "scx-app",
    components: {
        ScxThemeSwitch,
        ScxNavbar,
        ScxLogo,
        ScxMenuToggle,
        ScxMenu,
        ScxUserPanel,
        ScxSidebar,
        ScxMain,
        ScxNotice
    },
    setup() {
        const userConfig = useScxUserConfig();
        return {
            userConfig
        };
    }
};
</script>

<style>
.scx-app {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--scx-text-color);
    background: var(--scx-bg);
    /*使切换主题时颜色过渡平滑一些*/
    transition: background 200ms ease, color 100ms ease;
    flex-direction: column;
}

.scx-content {
    display: flex;
    height: 100%;
    overflow: auto;
    z-index: 3;
}

.scx-sidebar {
    width: 200px;
    transition: width 200ms;
}

.scx-sidebar.collapse {
    width: 54px;
}

.scx-sidebar-top {
    justify-content: start;
}

.scx-logo {
    flex-shrink: unset;
}
</style>
