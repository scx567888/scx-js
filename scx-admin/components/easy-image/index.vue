<template>
    <el-image v-if="listModelValue.length>0" :preview-src-list="previewSrcList"
              :preview-teleported="true"
              :src="src"
              class="easy-image-preview"
              style=""/>
    <div v-else class="easy-image-no-preview">
        无图片
    </div>
</template>

<script>
import "./index.css";
import {computed} from "vue";
import {useAliOSS} from "../../index.js";
import {useScxFSS} from "@scx-js/scx-app-x";


export default {
    name: "easy-image",
    props: {
        modelValue: {
            type: [String, Array],
            default: null
        },
        uploadHandlerType: {
            type: String,
            default: "scx-fss" // 取值 scx-fss ali-oss
        },
    },
    setup(props) {
        const scxFSS = useScxFSS();

        const aliOSS = useAliOSS();

        const listModelValue = computed(() => {
            if (props.modelValue) {
                return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
            } else {
                return [];
            }
        });

        const previewSrcList = computed(() => {
            switch (props.uploadHandlerType) {
                case "scx-fss":
                    return listModelValue.value.map(d => scxFSS.joinImageURL(d));
                case "ali-oss":
                    return listModelValue.value.map(d => aliOSS.joinURL(d));
                default:
                    throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        });

        const src = computed(() => {
            const first = previewSrcList.value[0];
            switch (props.uploadHandlerType) {
                case "scx-fss":
                    return first + "?w=100&h=100";
                case "ali-oss":
                    return first + "?x-oss-process=image/resize,w_100";
                default:
                    throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        });

        return {
            previewSrcList,
            src,
            listModelValue
        };

    }
};
</script>
