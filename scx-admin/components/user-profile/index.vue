<template>

    <div class="user-profile">

        <change-user-avatar/>

        <slot name="info">
            <el-descriptions :column="1" border>
                <el-descriptions-item align="center" label="用户名" label-align="center" width="150px">
                    {{ userInfo.username }}
                </el-descriptions-item>
            </el-descriptions>
        </slot>

        <el-divider/>
        <div>
            <el-button plain type="primary" @click="showChangeUsername">点击修改用户名</el-button>
            <el-button plain type="success" @click="showChangePassword">点击修改密码</el-button>
        </div>
    </div>

    <change-username-dialog ref="changeUsernameDialogRef" :dialog-width="dialogWidth"/>

    <change-password-dialog ref="changePasswordDialogRef" :dialog-width="dialogWidth"/>

</template>

<script>
import "./index.css";
import {ref} from "vue";
import {useScxUserInfo} from "../../index.js";
import EasyUpload from "../easy-upload/index.vue";
import EasyFormItem from "../easy-form-item/index.vue";
import ChangeUserAvatar from "./change-user-avatar.vue";
import ChangeUsernameDialog from "./change-username-dialog.vue";
import ChangePasswordDialog from "./change-password-dialog.vue";

export default {
    name: "user-profile",
    components: {
        ChangeUserAvatar,
        ChangeUsernameDialog,
        ChangePasswordDialog,
        EasyFormItem,
        EasyUpload
    },
    props: {
        dialogWidth: {
            default: "400px"
        },
    },
    setup() {

        const userInfo = useScxUserInfo();

        const changeUsernameDialogRef = ref();
        const changePasswordDialogRef = ref();

        function showChangeUsername() {
            changeUsernameDialogRef.value.showChangeUsername();
        }

        function showChangePassword() {
            changePasswordDialogRef.value.showChangePassword();
        }

        return {
            userInfo,
            changeUsernameDialogRef,
            changePasswordDialogRef,
            showChangeUsername,
            showChangePassword
        };
    }
};

</script>
