<template>
    <div class="scx-main">
        <router-view v-slot="{ Component }">
            <!-- 路由切换动画 -->
            <transition mode="out-in" name="scx-main-t">
                <!-- 对所有页面都进行缓存  v-if 是为了刷新当前路由 -->
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script>

export default {
    name: "scx-main",
    setup() {
        return {};
    }

};
</script>

<style>
.scx-main {
    height: 100%;
    width: 100%;
    overflow: auto;
}

/*---------------------- vue 动画 -----------------------*/
.scx-main-t-enter-active,
.scx-main-t-leave-active {
    transition: opacity 200ms, transform 200ms;
}

.scx-main-t-enter-from {
    opacity: 0;
    transform: scale(0.98, 0.98);
}

.scx-main-t-leave-to {
    opacity: 0;
    transform: scale(1.02, 1.02);
}
</style>
