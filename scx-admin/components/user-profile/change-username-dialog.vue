<template>
    <el-dialog v-model="changeUsernameDialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
               :width="dialogWidth" title="修改用户名">
        <el-form ref="changeUsernameRef" :model="changeUsernameForm" label-width="120px">
            <easy-form-item label="新用户名" prop="newUsername" required>
                <el-input v-model="changeUsernameForm.newUsername"></el-input>
            </easy-form-item>
            <easy-form-item label="密码" prop="password" required>
                <el-input v-model="changeUsernameForm.password" show-password></el-input>
            </easy-form-item>
        </el-form>
        <span>注意 : 请牢记修改后的用户名, 忘记请联系管理员进行找回!!!</span>
        <template #footer>
            <el-button @click="changeUsernameDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeUsername">确认修改</el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import EasyFormItem from "../easy-form-item/index.vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useScxUserInfo} from "../../scx/index.js";
import {useScxReq} from "@scx-js/scx-http";
import {useScxFSS} from "@scx-js/scx-app-x";

const props = defineProps({
    dialogWidth: {
        default: "400px"
    },
});

const fss = useScxFSS();
const req = useScxReq();
const userInfo = useScxUserInfo();

const changeUsernameRef = ref();

const changeUsernameDialogVisible = ref(false);

const changeUsernameForm = reactive({
    newUsername: "",
    password: ""
});

function changeUsername() {
    changeUsernameRef.value.validate((valid) => {
        if (valid) {
            req.post("api/auth/change-username-by-self", {
                newUsername: changeUsernameForm.newUsername,
                password: changeUsernameForm.password
            }).then(data => {
                userInfo.username = data.username;
                ElMessage.success("修改用户名成功 !!! 下次登录请使用新用户名 !!!");
                changeUsernameDialogVisible.value = false;
            }).catch(e => {
                if (e.message === "username-already-exists") {
                    ElMessage.error("用户名已被占用 !!!");
                } else if (e.message === "wrong-password") {
                    ElMessage.error("密码错误 !!!");
                } else {
                    ElMessage.error("修改用户名失败 !!! 请稍后再试 !!!");
                }
            });
        }
    });
}

function showChangeUsername() {
    changeUsernameForm.newUsername = userInfo.username;
    changeUsernameForm.password = "";
    changeUsernameDialogVisible.value = true;
}

defineExpose({
    showChangeUsername
});
</script>

<style scoped>

</style>
