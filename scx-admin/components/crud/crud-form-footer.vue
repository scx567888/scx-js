<template>

    <el-button :loading="crudContext.editDialog.confirmButtonLoading" type="primary"
               @click="crudContext.createOrUpdateModel()">
        确定
    </el-button>

    <el-button @click="crudContext.editDialog.visible = false">
        取消
    </el-button>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-form-footer",
    setup() {
        const crudContext = useCrudContext();
        return {crudContext};
    }
};
</script>

<style scoped>

</style>
