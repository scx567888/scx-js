<template>

    <login-bg>

        <login-form-bg>

            <login-form ref="loginFormRef"/>

        </login-form-bg>

    </login-bg>

</template>

<script setup>
import "./index.css";
import {onMounted, ref} from "vue";
import LoginForm from "./login-form.vue";
import LoginBg from "./login-bg.vue";
import LoginFormBg from "./login-form-bg.vue";

const loginFormRef = ref(null);

onMounted(() => {
    loginFormRef.value.focus();
    loginFormRef.value.resetFields();
});

</script>
