<template>
    <scx-switch v-model="userConfig.dark" class="scx-theme-switch" @change="onChange">
        <template #icon>
            <scx-icon :icon="userConfig.dark ? 'filled-moon':'filled-sun'"/>
        </template>
        <template #label>
            {{ userConfig.dark ? "黑暗" : "明亮" }}
        </template>
    </scx-switch>
</template>

<script>
import {changeTheme} from "@scx-js/scx-ui/style/changeTheme.js";
import {useScxConfigManager, useScxUserConfig} from "../scx/index.js";

export default {
    name: "scx-theme-switch",
    setup() {
        const userConfig = useScxUserConfig();
        const scxConfigManager = useScxConfigManager();

        changeTheme(userConfig.dark);

        function onChange(v) {
            changeTheme(v);
            scxConfigManager.updateUserConfig({dark: v});
        }

        return {
            userConfig,
            onChange
        };
    }
};
</script>

<style>
.scx-theme-switch {
    flex-shrink: 0;
    width: 60px;
}

.scx-theme-switch.scx-switch {
    background: var(--scx-bg);
}

.scx-theme-switch.scx-switch > .scx-switch-icon {
    background: var(--scx-overlay-bg);
}

.scx-theme-switch.scx-switch > .scx-switch-icon > .scx-icon {
    fill: var(--scx-text-color);
}
</style>
