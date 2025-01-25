<template>

    <!-- 用户面板按钮 -->
    <div class="scx-user-panel-btn" @click="changeUserPanel()">
        <el-avatar :src="getAvatar()" class="scx-user-panel-btn-avatar" shape="circle">
            <img :src="defaultAvatar"/>
        </el-avatar>
        <span class="scx-user-panel-btn-label">
        {{ userInfo.username }}
        </span>
    </div>

    <!-- 用户面板 -->
    <scx-panel v-model="showUserPanelDialog" class='scx-user-panel' transition-type="top">

        <scx-panel-item v-for="i in userPanelItemList" :active="activeMenu===i.name" @click="handleGoToRoute(i.name)">
            <scx-icon v-if="i.meta && i.meta.icon" :icon="i.meta.icon"/>
            <span>{{ getRouteTitle(i) }}</span>
        </scx-panel-item>

        <!-- 分割线 -->
        <div v-if="userPanelItemList.length > 0" style="border-bottom: 2px solid #9a9696;"></div>

        <scx-panel-item class="scx-dialog-item" @click="logout">
            <scx-icon icon="outlined-poweroff"/>
            <span>退出登录</span>
        </scx-panel-item>
    </scx-panel>

</template>

<script>
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import defaultAvatar from "./img/default-avatar.gif";
import {ElMessage} from "element-plus";
import {ScxPanel, ScxPanelItem, } from "@scx-js/scx-ui";
import {useScxFSS } from "@scx-js/scx-app-x";
import {getRouteTitle, routeNoNeedLogin, useScxAuth, useScxRouter, useScxUserInfo} from "../scx/index.js";

export default {
    name: "scx-user-panel",
    components: {
        ScxPanel,
        ScxPanelItem
    },
    setup() {
        //获取路由对象
        const route = useRoute();
        const router = useRouter();

        const auth = useScxAuth();
        const fss = useScxFSS();
        const userInfo = useScxUserInfo();
        const scxRouter = useScxRouter();
        //当前路由
        const activeMenu = computed(() => route.name);

        //在用户面板中显示的菜单
        const userPanelItemList = scxRouter.getRoutes().filter(s => s.children.length === 0 && (s.meta && s.meta.showInUserPanel));
        //是否显示用户面板弹窗
        const showUserPanelDialog = ref(false);

        //点击 跳转路由
        function handleGoToRoute(item) {
            showUserPanelDialog.value = false;
            router.push({name: item});
        }

        /**
         * 退出登录
         */
        function logout() {
            auth.logout().then(() => {
                debugger;
                ElMessage.success("退出登录成功 !!!");
                //查看当前页面是否在未登录即可访问的白名单中 , 在的话不做任何处理 , 不在的话重定向到登录
                if (!routeNoNeedLogin(route)) {
                    //再退出到登录页面时 携带当前页面的参数
                    router.push(scxRouter.getLoginRoute(route));
                }
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                showUserPanelDialog.value = false;
            });
        }

        /**
         * 关闭 用户面板
         * @param evt
         */
        function closeUserPanelDialog(evt) {
            const parentA = evt.target.closest(".scx-user-panel-btn");
            const parentB = evt.target.closest(".scx-user-panel");
            if (!parentA && !parentB) {
                showUserPanelDialog.value = false;
            }
        }

        function changeUserPanel() {
            showUserPanelDialog.value = !showUserPanelDialog.value;
        }

        //监听
        watch(showUserPanelDialog, (value) => {
            if (value) {
                window.addEventListener("click", closeUserPanelDialog);
            } else {
                window.removeEventListener("click", closeUserPanelDialog);
            }
        });

        function getAvatar() {
            if (userInfo.avatar) {
                return fss.joinImageURL(userInfo.avatar, {
                    w: 200,
                    h: 200
                });
            } else {
                return defaultAvatar;
            }
        }

        return {
            userInfo,
            userPanelItemList,
            showUserPanelDialog,
            defaultAvatar,
            activeMenu,
            logout,
            handleGoToRoute,
            getAvatar,
            changeUserPanel,
            getRouteTitle
        };

    }

};
</script>
<style>

/*用户面板按钮*/
.scx-user-panel-btn {
    position: relative;
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: start;
    transition: background 0.3s;
    user-select: none;
    cursor: pointer;
    column-gap: 5px;
    padding-left: 10px;
    padding-right: 10px;
    min-width: 80px;
    max-width: 150px;
    margin-right: 10px;
}

.scx-user-panel-btn:hover {
    background: var(--scx-theme-bg);
}

.scx-user-panel-btn-label {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.scx-user-panel-btn-avatar {
    transition: transform 200ms;
    flex-shrink: 0;
}

.scx-user-panel-btn-avatar:active {
    transform: scale(0.9);
}

/*弹窗*/
.scx-user-panel {
    position: fixed;
    z-index: 200;
    top: calc(50px + 6px);
    right: 10px;
    width: 150px;
    display: grid;
    grid-row-gap: 10px;
}

</style>
