<template>
    <div class="scx-sidebar">
        <!-- 顶部 -->
        <div v-if="$slots['top']" class="scx-sidebar-top">
            <slot name="top"/>
        </div>
        <!-- 中心 -->
        <div class="scx-sidebar-center">
            <slot/>
        </div>
        <!-- 底部 -->
        <div v-if="$slots['bottom']" class="scx-sidebar-bottom">
            <slot name="bottom"/>
        </div>
    </div>
</template>

<script>

export default {
    name: "scx-sidebar",
    components: {}
};
</script>

<style>
.scx-sidebar {
    z-index: 5;
    flex-shrink: 0;
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
    box-shadow: var(--scx-box-shadow-right);
    background: var(--scx-overlay-bg);
    /*使切换主题时颜色过渡平滑一些*/
    transition: background-color 100ms;
}

.scx-sidebar-top {
    z-index: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    flex-shrink: 0;
    justify-content: center;
    box-shadow: var(--scx-box-shadow-bottom);
    width: 100%;
}

.scx-sidebar-center {
    height: 100%;
    overflow: hidden;
}

.scx-sidebar-center:hover {
    overflow-y: auto;
}

.scx-sidebar-bottom {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    box-shadow: var(--scx-box-shadow-top);
}
</style>
