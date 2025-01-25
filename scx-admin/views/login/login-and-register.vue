<template>

    <login-bg>

        <login-form-bg :class="[activeTab,{needAnimation:needAnimation}]">

            <el-tabs v-model="activeTab" stretch>
                <el-tab-pane label="账号登录" name="loginTab">
                    <login-form ref="loginFormRef"/>
                </el-tab-pane>

                <el-tab-pane label="注册账号" name="registerTab">
                    <register-form ref="registerFormRef" @register-success="onRegisterSuccess"/>
                </el-tab-pane>
            </el-tabs>

        </login-form-bg>

    </login-bg>

</template>

<script setup>
import "./index.css";
import {onMounted, ref, watch} from "vue";
import LoginForm from "./login-form.vue";
import RegisterForm from "./register-form.vue";
import LoginBg from "./login-bg.vue";
import LoginFormBg from "./login-form-bg.vue";

const activeTab = ref("loginTab");

const needAnimation = ref(false);

const loginFormRef = ref(null);

const registerFormRef = ref(null);

function changeActiveTab(tabName) {
    if (tabName === "loginTab") {
        console.log(loginFormRef);
        loginFormRef.value.focus();
        registerFormRef.value.resetFields();
    } else if (tabName === "registerTab") {
        registerFormRef.value.focus();
        loginFormRef.value.resetFields();
    }
}

function onRegisterSuccess({
                               username,
                               password
                           }) {
    loginFormRef.value.loginForm.username = username;
    loginFormRef.value.loginForm.password = password;
    activeTab.value = "loginTab";
}

onMounted(() => {
    watch(() => activeTab.value, (newVal) => {
        needAnimation.value = true;
        changeActiveTab(newVal);
    }, {immediate: true});
});

</script>
