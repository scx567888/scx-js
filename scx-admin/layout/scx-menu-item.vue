<template>

    <el-sub-menu v-if="isSubMenu() && routeCanShowInMenu(data)" :index="data.name">
        <template #title>
            <scx-icon v-if="data.meta && data.meta.icon" :icon="data.meta.icon"/>
            <span>{{ getRouteTitle(data) }}</span>
        </template>
        <scx-menu-item v-for="i in canAccessRoutes" :data="i"/>
    </el-sub-menu>

    <el-menu-item v-else-if="routeCanShowInMenu(data)" :index="data.name" :route="data">
        <scx-icon v-if="data.meta && data.meta.icon" :icon="data.meta.icon"/>
        <span>{{ getRouteTitle(data) }}</span>
    </el-menu-item>

</template>

<script>
import {getRouteTitle, routeCanShowInMenu, useScxRouter} from "../scx/index.js";
import {computed} from "vue";

export default {
    name: "scx-menu-item",
    methods: {getRouteTitle},
    props: {
        data: {}
    },
    setup(props, ctx) {

        const scxRouter = useScxRouter();

        const allRoutes = props.data.children ? props.data.children : [];

        const canAccessRoutes = computed(() => allRoutes.filter((c) => scxRouter.canAccessThisRoute(c)));

        function isSubMenu() {
            return canAccessRoutes.value.length > 0;
        }

        return {
            isSubMenu,
            routeCanShowInMenu,
            canAccessRoutes
        };
    }
};
</script>
