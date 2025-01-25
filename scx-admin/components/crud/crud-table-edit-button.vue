<template>
    <el-button size="small" type="primary" @click="crudContext.handleUpdate(data)">
        编辑
    </el-button>
</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-table-edit-button",
    props: {
        data: {
            required: true
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
