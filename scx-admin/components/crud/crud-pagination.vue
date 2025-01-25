<template>

    <el-pagination :background="true" :currentPage="crudContext.pagination.currentPage"
                   :page-size="crudContext.pagination.pageSize"
                   :page-sizes="[10,20,50,100]"
                   :total="crudContext.total"
                   layout='total, sizes, prev, pager, next, jumper'
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"/>

</template>

<script>
import {useCrudContext} from "../../index.js";

export default {
    name: "crud-pagination",
    setup() {

        const crudContext = useCrudContext();

        /**
         * 页码数量发生变化
         * @param val 变化后的数量
         */
        function handleCurrentChange(val) {
            crudContext.pagination.currentPage = val;
            crudContext.getList();
        }

        /**
         * 每页数量发生变化
         * @param val 变化后的数量
         */
        function handleSizeChange(val) {
            crudContext.pagination.pageSize = val;
            crudContext.getList();
        }

        return {
            crudContext,
            handleCurrentChange,
            handleSizeChange
        };
    }
};
</script>

<style scoped>

</style>
