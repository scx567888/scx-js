<template>

    <el-popconfirm title="确定删除全部选中数据 (不可恢复) ?" @confirm="crudContext.batchDelete()">
        <template #reference>
            <el-button class="footer-item" plain type="danger">批量删除</el-button>
        </template>
    </el-popconfirm>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-batch-delete",
    setup() {

        const crudContext = useCrudContext();

        return {crudContext};
    }
};
</script>

<style scoped>

</style>
