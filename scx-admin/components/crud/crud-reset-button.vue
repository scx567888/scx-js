<template>
    <el-button circle type="warning" @click="crudContext.resetWhere().getList()">
        <scx-icon icon="outlined-arrow-left"/>
    </el-button>
</template>
<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-reset-button",
    setup() {
        const crudContext = useCrudContext();
        return {crudContext};
    }
};
</script>
<style scoped>

</style>
