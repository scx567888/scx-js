<template>
    <div class="scx-logo">

        <div class="scx-logo-logo">
            <scx-icon icon="outlined-scx-logo"/>
        </div>

        <div class="scx-logo-label">
            {{ systemConfig.title }}
        </div>

    </div>
</template>

<script>
import {useScxSystemConfig} from "../scx/index.js";

export default {
    name: "scx-logo",
    setup() {
        const systemConfig = useScxSystemConfig();
        return {systemConfig};
    }
};
</script>

<style scoped>
.scx-logo {
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
}

.scx-logo-logo {
    padding: 10px;
    height: 100%;
    width: 54px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scx-logo-logo > .scx-icon {
    width: 100%;
    height: 100%;
    fill: var(--scx-theme);
}

.scx-logo-label {
    white-space: nowrap;
    overflow: hidden;
    color: var(--scx-theme);
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
}

.collapse .scx-logo-label {
    visibility: hidden;
}
</style>
