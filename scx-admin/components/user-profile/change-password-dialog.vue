<template>
    <el-dialog v-model="changePasswordDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               :width="dialogWidth" title="修改密码">
        <el-form ref="changePasswordRef" :model="changePasswordForm" label-width="100px">
            <easy-form-item label="原密码" prop="password" required>
                <el-input v-model="changePasswordForm.password" show-password></el-input>
            </easy-form-item>
            <easy-form-item label="新密码" prop="newPassword" required>
                <el-input v-model="changePasswordForm.newPassword" show-password></el-input>
            </easy-form-item>
            <el-form-item :rules="newPassword2Rules" label="确认密码" prop="newPassword2">
                <el-input v-model="changePasswordForm.newPassword2" show-password></el-input>
            </el-form-item>
        </el-form>
        <span>注意 : 请牢记修改后的密码, 忘记请联系管理员进行找回!!!</span>
        <template #footer>
            <el-button @click="changePasswordDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePassword">确认修改</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import EasyFormItem from "../easy-form-item/index.vue";
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import {useScxReq} from "@scx-js/scx-http";
import {useScxFSS} from "@scx-js/scx-app-x";
import {useScxUserInfo} from "../../scx/index.js";

const props = defineProps({
    dialogWidth: {
        default: "80%"
    },
});

const fss = useScxFSS();
const req = useScxReq();
const userInfo = useScxUserInfo();

const changePasswordRef = ref();

const changePasswordDialogVisible = ref(false);

const changePasswordForm = reactive({
    password: "",
    newPassword: "",
    newPassword2: ""
});

const newPassword2Rules = [{
    type: "string",
    trigger: "blur",
    required: true,
    validator: (rule, value, callback) => {
        if (value.trim() === "") {
            return callback("请再次输入密码 !!!");
        } else if (changePasswordForm.newPassword !== value) {
            callback("两次密码不一致 !!!");
        } else {
            callback();
        }
    }
}];


function changePassword() {
    changePasswordRef.value.validate((valid) => {
        if (valid) {
            req.post("api/auth/change-password-by-self", {
                newPassword: changePasswordForm.newPassword,
                oldPassword: changePasswordForm.password
            }).then(data => {
                ElMessage.success("修改密码成功 !!! 下次登录请使用新密码 !!!");
                changePasswordDialogVisible.value = false;
            }).catch(e => {
                if (e.message === "wrong-password") {
                    ElMessage.error("密码错误 !!!");
                } else {
                    ElMessage.error("修改密码失败 !!! 请稍后再试 !!!");
                }
            });
        }
    });
}

function showChangePassword() {
    changePasswordForm.newPassword = "";
    changePasswordForm.password = "";
    changePasswordForm.newPassword2 = "";
    changePasswordDialogVisible.value = true;
}

defineExpose({
    showChangePassword
});
</script>

<style scoped>

</style>
