<template>

    <el-button round type="primary" @click="crudContext.handleQuery()">
        <scx-icon icon="outlined-search"/>
        <span>搜索</span>
    </el-button>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-search-button",
    setup() {
        const crudContext = useCrudContext();

        return {crudContext};
    }
};
</script>

<style scoped>

</style>
