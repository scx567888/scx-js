<template>

    <div class="left-tree">

        <div class="left-tree-hearer">

            <el-button class="left-tree-refresh-button" size="small" @click="refresh()">
                <scx-icon icon="outlined-sync"/>
            </el-button>

            <div class="left-tree-title">
                <slot name="left-tree-title">
                    树
                </slot>
            </div>

            <div class="left-tree-title-info">
                <slot name="left-tree-title-info">

                </slot>
            </div>

        </div>

        <el-input v-model="filterText" clearable placeholder="输入名称进行过滤"/>

        <el-tree ref="treeRef"
                 :allow-drag="allowDrag"
                 :allow-drop="allowDrop"
                 :data="treeData"
                 :draggable="!readonly"
                 :expand-on-click-node="false"
                 :filter-node-method="filterNode"
                 :highlight-current="true"
                 class="tree1" default-expand-all node-key="id"
                 @node-click="nodeClick" @node-contextmenu="nodeContextMenu" @node-drop="nodeDrop">

            <template #default="{ data }">

                <div class="custom-tree-node">
                    <slot :data="data" name="tree-node">

                    </slot>
                </div>

            </template>

        </el-tree>

        <slot>

        </slot>

    </div>
</template>
<script>
import {ref, watch} from "vue";

export default {
    name: "left-tree",
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        treeData: {
            type: Array,
            default: [],
        },
        allowDrag: {
            type: Function,
            default: null
        },
        allowDrop: {
            type: Function,
            default: null
        }
    },
    emits: ["refresh", "nodeClick", "nodeContextMenu", "nodeDrop"],
    setup(props, ctx) {

        const filterText = ref("");

        const treeRef = ref();

        //监控 filterText 以实现树的过滤
        watch(filterText, (val) => {
            treeRef.value.filter(val);
        });

        function filterNode(value, data) {
            if (!value) {
                return true;
            }
            return data.name.indexOf(value) !== -1;
        }

        function refresh() {
            ctx.emit("refresh");
        }

        function nodeDrop(dragNode, dropNode, type) {
            ctx.emit("nodeDrop", dragNode, dropNode, type);
        }

        function nodeClick(node) {
            ctx.emit("nodeClick", node);
        }

        function nodeContextMenu(e, data) {
            ctx.emit("nodeContextMenu", e, data);
        }

        return {
            filterText,
            filterNode,
            refresh,
            nodeDrop,
            nodeClick,
            nodeContextMenu

        };
    }
};

</script>
<style>
@import "./index.css";

</style>
