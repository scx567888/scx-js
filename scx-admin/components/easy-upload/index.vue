<template>
    <scx-upload v-model="proxyModelValue"
                :before-upload="beforeUpload"
                :disabled="disabled"
                :file-info-handler="getFileInfoHandler()"
                :on-error="onError"
                :upload-handler="getUploadHandler()"/>
</template>

<script>
import {computed} from "vue";
import {ElMessage} from "element-plus";
import {useAliOSS} from "../../index.js";
import {ScxUpload} from "@scx-js/scx-ui";

export default {
    name: "easy-upload",
    components: {ScxUpload},
    props: {
        modelValue: {
            type: String,
            default: null
        },
        uploadHandler: {
            type: Function,
            default: null //优先级大于  uploadHandlerType 指定的
        },
        fileInfoHandler: {
            type: Function,
            default: null
        },
        beforeUpload: {
            type: Function,
            default: null
        },
        uploadHandlerType: {
            type: String,
            default: "scx-fss" // 取值 scx-fss ali-oss
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const aliOSS = useAliOSS();

        const proxyModelValue = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                ctx.emit("update:modelValue", value);
            }
        });

        function getUploadHandler() {
            if (props.uploadHandler) {
                return props.uploadHandler;
            } else if (props.uploadHandlerType === "scx-fss") {
                return null;
            } else if (props.uploadHandlerType === "ali-oss") {
                return (e, p) => aliOSS.upload(e, p);
            } else {
                throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        }

        function getFileInfoHandler() {
            if (props.fileInfoHandler) {
                return props.fileInfoHandler;
            } else if (props.uploadHandlerType === "scx-fss") {
                return null;//这里添加压缩参数
            } else if (props.uploadHandlerType === "ali-oss") {
                return (e) => aliOSS.info(e);
            } else {
                throw new Error("未知的 uploadHandlerType : " + props.uploadHandlerType);
            }
        }

        const onError = (error, files) => {
            ElMessage.error(error);
        };

        return {
            proxyModelValue,
            getUploadHandler,
            getFileInfoHandler,
            onError,
        };

    }
};
</script>
