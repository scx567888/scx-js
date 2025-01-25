<template>
    <el-form ref="scxCreateAndUpdateFormRef" :model="crudContext.temp" inline label-position="right"
             label-width="150px">
        <slot></slot>
    </el-form>
</template>

<script>
import {ref} from "vue";
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-edit-form",
    setup() {
        const scxCreateAndUpdateFormRef = ref(null);
        const crudContext = useCrudContext();
        crudContext.scxCreateAndUpdateFormRef = scxCreateAndUpdateFormRef;
        return {
            crudContext,
            scxCreateAndUpdateFormRef
        };
    },
};
</script>

<style scoped>

</style>
