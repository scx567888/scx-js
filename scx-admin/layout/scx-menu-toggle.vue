<template>
    <div class="scx-menu-toggle" @click="changeMenuCollapse()">
        <scx-icon :class="{'isOpened':userConfig.menuCollapse}" class="scx-menu-toggle-icon" icon="outlined-menu-fold"/>
    </div>
</template>

<script>
import {useScxConfigManager, useScxUserConfig} from "../scx/index.js";

export default {
    name: "scx-menu-toggle",
    setup() {

        const userConfig = useScxUserConfig();
        const scxConfigManager = useScxConfigManager();

        function changeMenuCollapse() {
            userConfig.menuCollapse = !userConfig.menuCollapse;
            scxConfigManager.updateUserConfig({menuCollapse: userConfig.menuCollapse});
        }

        return {
            userConfig,
            changeMenuCollapse
        };

    }
};
</script>
<style>
.scx-menu-toggle {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    transition: all 200ms;
    width: 54px;
    flex-shrink: 0;
    justify-content: center;
}

.scx-menu-toggle:hover {
    background-color: var(--scx-theme-bg);
}

.scx-menu-toggle-icon {
    display: inline-block;
    vertical-align: middle;
    transition: all 200ms;
    width: 40%;
    height: 40%;
}

.scx-menu-toggle:hover > .scx-menu-toggle-icon {
    fill: var(--scx-theme);
}

.scx-menu-toggle > .scx-menu-toggle-icon.isOpened {
    transform: rotateY(180deg);
}

.scx-menu-toggle:active > .scx-menu-toggle-icon {
    transform: scale(0.9);
}

.scx-menu-toggle:active > .scx-menu-toggle-icon.isOpened {
    transform: rotateY(180deg) scale(0.9);
}
</style>
