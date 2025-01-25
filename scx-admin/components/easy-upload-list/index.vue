<template>
    <scx-upload-list v-model="proxyModelValue"
                     :before-upload="getBeforeUpload"
                     :file-info-handler="getFileInfoHandler()"
                     :on-error="onError"
                     :upload-handler="getUploadHandler()">
        <template #default="{index,item}">
            <slot :index="index" :item="item">
            </slot>
        </template>
    </scx-upload-list>
</template>

<script>
import {computed} from "vue";
import {ElMessage} from "element-plus";
import {useAliOSS} from "../../index.js";
import {ScxUploadList} from "@scx-js/scx-ui";

export default {
    name: "easy-upload-list",
    components: {ScxUploadList},
    props: {
        modelValue: {
            type: Array,
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
        limit: {
            type: Number,
            default: null
        }
    },
    setup(props, ctx) {
        const aliOSS = useAliOSS();

        const proxyModelValue = computed({
            get() {
                return props.modelValue?props.modelValue:[];
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

        const getBeforeUpload = (files) => {
            if (props.limit && proxyModelValue.value.length + files.length > props.limit) {
                ElMessage.warning("文件数量超出上限, 上限 : " + props.limit + " !!!");
                return false;
            }
            return props.beforeUpload ? props.beforeUpload(files) : true;
        };

        return {
            proxyModelValue,
            getUploadHandler,
            getFileInfoHandler,
            onError,
            getBeforeUpload
        };

    }
};
</script>
