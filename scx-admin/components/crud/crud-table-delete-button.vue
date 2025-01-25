<template>
    <el-popconfirm title="确定删除此条数据 ?" @confirm="crudContext.deleteOne(data)">
        <template #reference>
            <el-button :disabled="disabled" size="small" type="danger">删除</el-button>
        </template>
    </el-popconfirm>
</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-table-delete-button",
    props: {
        data: {
            required: true
        },
        disabled: {
            default: false
        }
    },
    setup() {
        const crudContext = useCrudContext();
        return {crudContext};
    }
};
</script>

<style scoped>

</style>
