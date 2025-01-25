<template>

    <el-table ref="scxTableRef" v-loading="crudContext.tableLoading" :data="crudContext.tableBody"
              :highlight-current-row="true"
              border
              class="crud-table"
              max-height="600"
              row-key="id"
              stripe
              @select="(a)=>crudContext.tableSelect(a)"
              @selectAll="(a)=>crudContext.tableSelectAll(a)"
              @sort-change="handleSortChange"
              @selection-change="(a)=>crudContext.handleSelectionChange(a)"
              @row-contextmenu="handleRowContextMenu">
        <el-table-column :reserve-selection="true" type="selection" width="55"/>
        <slot></slot>
    </el-table>

</template>

<script>
import {useCrudContext} from "../../index.js";
import {ref} from "vue";
import {showContextMenu} from "@scx-js/scx-ui";

export default {
    name: "crud-table",
    setup() {
        const scxTableRef = ref(null);
        const crudContext = useCrudContext();

        crudContext.scxTableRef = scxTableRef;

        function handleSortChange(column) {
            const sortTypeMap = {
                ascending: "ASC",
                descending: "DESC"
            };
            crudContext.orderBy.fieldName = column.prop;
            crudContext.orderBy.sortType = column.order !== null ? sortTypeMap[column.order] : null;
            crudContext.getList();
        }

        function handleRowContextMenu(row, column, event) {
            scxTableRef.value.setCurrentRow(row);
            event.preventDefault();
            openMenu(row, event);
        }

        function previousPage() {
            //页面减 1
            crudContext.pagination.currentPage += -1;
            //如果小于 1 证明当前页面是 第一页 不做查询操作 用于减少后台并发量
            if (crudContext.pagination.currentPage < 1) {
                crudContext.pagination.currentPage = 1;
            } else {
                //否则执行查询方法
                crudContext.getList();
            }
        }

        function nextPage() {
            crudContext.pagination.currentPage += 1;
            crudContext.getList();
        }

        const openMenu = (row, e) => showContextMenu(e, [
            {
                label: "刷新",
                callback: (close) => {
                    crudContext.getList();
                    close();
                }
            },
            {
                label: "编辑",
                callback: (close) => {
                    crudContext.handleUpdate(row);
                    close();
                }
            },
            {
                label: "删除此条",
                callback: (close) => {
                    crudContext.deleteOne(row);
                    close();
                }
            },
            {
                label: "删除选中",
                callback: (close) => {
                    crudContext.batchDelete();
                    close();
                }
            },
            {
                label: "上一页",
                callback: (close) => {
                    previousPage();
                    close();
                }
            },
            {
                label: "下一页",
                callback: (close) => {
                    nextPage();
                    close();
                }
            }
        ]);

        return {
            crudContext,
            scxTableRef,
            handleSortChange,
            handleRowContextMenu
        };
    }
};
</script>

<style>
.crud-table {
    --el-table-current-row-bg-color: var(--scx-theme-secondary);
    --el-table-row-hover-bg-color: var(--scx-theme-bg);
}

.el-table__body tr.current-row > td.el-table__cell {
    background-color: var(--el-table-current-row-bg-color) !important;
}
</style>
