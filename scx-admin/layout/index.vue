<template>
    <!-- element ui 配置 -->
    <el-config-provider :locale="zhCN">
        <scx-app/>
    </el-config-provider>
</template>

<script>
import zhCN from "element-plus/es/locale/lang/zh-cn";
import ScxApp from "./scx-app.vue";

export default {
    name: "scx-layout",
    components: {
        ScxApp,
    },
    setup() {

        return {
            zhCN
        };
    }
};
</script>
