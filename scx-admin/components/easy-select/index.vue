<template>
    <el-select clearable filterable>
        <el-option v-for="item in easyOption.options"
                   :key="easyOption.valueSupplier(item)"
                   :label="easyOption.labelSupplier(item)"
                   :value="easyOption.valueSupplier(item)"/>
    </el-select>
</template>

<script>
import {EasyOption} from "../../scx/index.js";

export default {
    name: "easy-select",
    props: {
        easyOption: {
            type: EasyOption,
            default: null,
        }
    },
    setup(props) {

    }
};
</script>

<style scoped>

</style>
