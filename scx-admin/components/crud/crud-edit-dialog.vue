<template>

    <el-dialog v-model="crudContext.editDialog.visible" :close-on-click-modal="false"
               :title="crudContext.getDialogTitle()"
               append-to-body
               width="60%">
        <slot></slot>
        <template v-slot:footer>
            <el-button :loading="crudContext.editDialog.confirmButtonLoading" type="primary"
                       @click="crudContext.createOrUpdateModel()">
                确定
            </el-button>
            <el-button @click="crudContext.editDialog.visible = false">
                取消
            </el-button>
        </template>
    </el-dialog>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-edit-dialog",
    setup() {
        const crudContext = useCrudContext();

        return {crudContext};
    }
};
</script>

<style scoped>

</style>
