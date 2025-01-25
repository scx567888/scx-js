<template>

    <el-button type="success"
               @click="crudContext.handleCreate()">
        <scx-icon icon="outlined-plus-circle"/>
        <span>添加</span>
    </el-button>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-add-button",
    setup(props, context) {
        const crudContext = useCrudContext();

        return {
            crudContext
        };
    }
};
</script>

<style scoped>

</style>
