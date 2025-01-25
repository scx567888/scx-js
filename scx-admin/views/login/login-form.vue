<template>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">

        <el-form-item prop="username">
            <el-input ref="loginUsernameRef" v-model="loginForm.username"
                      placeholder="请输入用户名"
                      @keyup.enter="onLogin">
                <template v-slot:prefix>
                    <scx-icon icon="outlined-user"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      placeholder="请输入密码"
                      show-password
                      @keyup.enter="onLogin">
                <template v-slot:prefix>
                    <scx-icon icon="outlined-unlock"/>
                </template>
            </el-input>
        </el-form-item>

        <el-button :loading="loginForm.loginBtnLoading" style="width: 100%" type="primary" @click="onLogin">
            登录
        </el-button>

    </el-form>
</template>
<script setup>
import {ElMessage} from "element-plus";
import {JsonVOError, useScxReq} from "@scx-js/scx-http";
import {useScxAuth, useScxRouter, useScxUserInfo} from "../../index.js";
import {reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {loginMessage} from "./login-message.js";

const auth = useScxAuth();
const req = useScxReq();
const scxRouter = useScxRouter();

const userInfo = useScxUserInfo();

const loginUsernameRef = ref(null);

const router = useRouter();
const route = useRoute();

const loginFormRef = ref(null);
const loginForm = reactive({
    username: "",
    password: "",
    loginBtnLoading: false
});

const loginFormRules = {
    username: [{
        type: "string",
        trigger: "change",
        required: true,
        validator: (rule, value, callback) => {
            if (value.trim() === "") {
                return callback("请输入正确的用户名 !!!");
            } else {
                callback();
            }
        }
    }],
    password: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.length === 0) {
                return callback("密码不能为空 !!!");  // reject with error message
            } else {
                callback();
            }
        }
    }]
};


function onLogin() {
    loginFormRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        loginForm.loginBtnLoading = true;
        auth.login(loginForm.username, loginForm.password)
                .then(() => {
                    auth.tokenCanUse().then(canUse => {
                        if (canUse) {
                            //1, 先获取需要重定向的页面
                            const redirectRoute = scxRouter.getRedirectRouteFromLoginRoute(route);
                            //2, 判断是否有权限访问
                            const canAccessThisRoute = scxRouter.canAccessThisRoute(redirectRoute);
                            //3, 如果用户没权限访问 则跳转首页
                            router.push(canAccessThisRoute ? redirectRoute : {name: "home"});
                            ElMessage.success("欢迎回来 " + userInfo.user.username + " !!!");
                        } else {
                            ElMessage.warning("认证 Token 无效 !!!");
                        }
                    });
                })
                .catch(error => {
                    if (error instanceof JsonVOError) {
                        ElMessage.error(loginMessage.t(error.message) || "未知错误 !!!");
                    } else {
                        ElMessage.error("Api 连接错误 !!!");
                    }
                }).finally(() => {
            loginForm.loginBtnLoading = false;
        });
    });

}

function focus() {
    loginUsernameRef.value.focus();
}

function resetFields() {
    loginFormRef.value.resetFields();
}

defineExpose({
    focus,
    resetFields,
    loginForm
});
</script>

<style scoped>

</style>
