<template>
    <ckeditor v-model="editorData" :config="editorConfig" :editor="ClassicEditor"/>
</template>

<script>
import "./index.css";
import {Ckeditor} from "@ckeditor/ckeditor5-vue";
import {computed} from "vue";
import {createScxUploadAdapterPlugin} from "./plugins/scx-upload-adapter.js";
import {ClassicEditor, InlineEditor} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import {defaultEditorConfig} from "./default-editor-config.js";
import {useScxFSS} from "@scx-js/scx-app-x";

export default {
    name: "easy-ckeditor",
    components: {
        ckeditor: Ckeditor
    },
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        config: {}
    },
    setup(props, ctx) {

        const fss = useScxFSS();

        const scxUploadAdapterPlugin = createScxUploadAdapterPlugin(fss);

        defaultEditorConfig.extraPlugins = [scxUploadAdapterPlugin];

        const editorConfig = Object.assign(defaultEditorConfig, props.config);

        const editorData = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                ctx.emit("update:modelValue", value);
            }
        });

        return {
            ClassicEditor,
            InlineEditor,
            editorData,
            editorConfig
        };
    }
};
</script>

<style>

</style>
