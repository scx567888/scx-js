<template>
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">

        <el-form-item prop="registerUsername">
            <el-input ref="registerUsernameRef" v-model="registerForm.registerUsername"
                      placeholder="用户名由字母和数字组成  大于4位小于15位"
                      @keyup.enter="onRegister">
                <template v-slot:prefix>
                    <scx-icon icon="outlined-user"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="registerPassword">
            <el-input v-model="registerForm.registerPassword"
                      placeholder="密码由字母,数字或符号组成  大于等于6位小于20位"
                      show-password
                      @keyup.enter="onRegister">
                <template v-slot:prefix>
                    <scx-icon icon="outlined-unlock"/>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="registerPasswordAgain">
            <el-input v-model="registerForm.registerPasswordAgain" placeholder="请再次输入密码"
                      show-password
                      @keyup.enter="onRegister">
                <template v-slot:prefix>
                    <scx-icon icon="outlined-unlock"/>
                </template>
            </el-input>
        </el-form-item>

        <el-button :loading="registerForm.registerBtnLoading" style="width: 100%" type="success" @click="onRegister">
            注册
        </el-button>

    </el-form>
</template>
<script setup>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useScxReq} from "@scx-js/scx-http";

const emit = defineEmits(["register-success"]);

const req = useScxReq();

const registerUsernameRef = ref(null);

const registerFormRef = ref(null);
const registerForm = reactive({
    registerUsername: "",
    registerPassword: "",
    registerPasswordAgain: "",
    registerBtnLoading: false
});

const registerFormRules = {
    registerUsername: [{
        type: "string",
        trigger: "change",
        required: true,
        validator: (rule, value, callback) => {
            if (value.length < 4) {
                callback("用户名太短 !!!");
            } else {
                return callback();
            }
        }
    }],
    registerPassword: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.length < 6) {
                callback("密码太短 !!!");  // reject with error message
            } else {
                return callback();
            }
        }
    }],
    registerPasswordAgain: [{
        type: "string",
        required: true,
        trigger: "change",
        validator: (rule, value, callback) => {
            if (value.trim() === "") {
                callback("请再次输入密码 !!!");
            } else if (value !== registerForm.registerPassword) {
                callback("两次输入密码不一致 !!!");
            } else {
                return callback();
            }
        }
    }]
};


// 注册方法
function onRegister() {
    registerFormRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        registerForm.registerBtnLoading = true;
        req.post("api/auth/signup", {
            username: registerForm.registerUsername,
            password: registerForm.registerPassword,
        }).then(response => {
            ElMessage.success("login.registerSuccess");
            registerForm.registerBtnLoading = false;
            emit("register-success", {
                username: registerForm.registerUsername,
                password: registerForm.registerPassword
            });
        }).catch(e => {
            if (e.message === "userAlreadyExists") {
                ElMessage.error("用户名已被占用 !!!");
            } else {
                ElMessage.error("未知错误 !!!");
            }
            registerForm.registerBtnLoading = false;
        });

    });
}

function focus() {
    registerUsernameRef.value.focus();
}

function resetFields() {
    registerFormRef.value.resetFields();
}

defineExpose({
    focus,
    resetFields,
    registerForm
});
</script>

<style scoped>

</style>
