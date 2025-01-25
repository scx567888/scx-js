<template>
    <easy-upload v-model="userInfo.avatar" :before-delete="removeAvatar" :upload-handler="upload"/>
</template>
<script setup>
import EasyUpload from "../easy-upload/index.vue";
import {ElMessage} from "element-plus";
import {useScxUserInfo} from "../../scx/index.js";
import {useScxReq} from "@scx-js/scx-http";
import {useScxFSS} from "@scx-js/scx-app-x";

const fss = useScxFSS();
const req = useScxReq();
const userInfo = useScxUserInfo();

function removeAvatar(e) {
    return new Promise((resolve, reject) => {
        req.post("api/auth/change-user-avatar", {newAvatar: ""}).then(data => {
            resolve(true);
            ElMessage.success("移除头像成功 !!!");
        }).catch(e => {
            ElMessage.error("移除头像失败 !!!");
        });
    });
}

function upload(e) {
    return new Promise((resolve, reject) => {
        fss.upload(e).then(data => {
            req.post("api/auth/change-user-avatar", {newAvatar: data.item.fssObjectID}).then(data => {
                userInfo.avatar = data.avatar;
                resolve(userInfo.avatar);
                ElMessage.success("修改头像成功 !!!");
            }).catch(e => {
                ElMessage.error("修改头像失败 !!!");
            });
        });
    });
}
</script>

<style scoped>

</style>
