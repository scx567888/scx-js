<template>
    <div class="scx-navbar">
        <div class="scx-navbar-left">
            <slot name="left"/>
        </div>
        <div class="scx-navbar-right">
            <slot name="right"/>
        </div>
    </div>
</template>
<script>

export default {
    name: "scx-navbar",
    components: {},
    setup() {

    }
};
</script>
<style>
.scx-navbar {
    height: 50px;
    width: 100%;
    top: 0;
    flex-shrink: 0;
    box-shadow: var(--scx-box-shadow-bottom);
    z-index: 4;
    background-color: var(--scx-overlay-bg);
    display: flex;
    justify-content: space-between;
}

.scx-navbar-left {
    display: flex;
    align-items: center;
    height: 100%;
}

.scx-navbar-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    column-gap: 20px;
}
</style>
