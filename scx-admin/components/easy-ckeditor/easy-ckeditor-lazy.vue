<template>
    <div ref="editorRef" class="easy-ckeditor-lazy" @click="initCkEditor()">

    </div>
</template>

<script>
import "./easy-ckeditor-lazy.css";
import {onMounted, ref, watch} from "vue";
import {createScxUploadAdapterPlugin} from "./plugins/scx-upload-adapter.js";
import {useScxFSS} from "scx-ui/scx/scx-fss";
import {InlineEditor} from "ckeditor5";
import {debounce} from "lodash-es";
import {defaultEditorConfig} from "./default-editor-config.js";

export default {
    name: "easy-ckeditor-lazy",
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        config: {}
    },
    setup(props, ctx) {

        const editorRef = ref();

        const fss = useScxFSS();

        const scxUploadAdapterPlugin = createScxUploadAdapterPlugin(fss);

        defaultEditorConfig.extraPlugins = [scxUploadAdapterPlugin];

        const editorConfig = Object.assign(defaultEditorConfig, props.config);

        let instance = null;

        let isInit = false;

        let lastEditorData = null;

        function initCkEditor() {
            if (isInit) {
                return;
            } else {
                isInit = true;
            }
            InlineEditor
                    .create(editorRef.value, editorConfig)
                    .then(editor => {

                        instance = editor;

                        setUpEditorEvents();

                        editor.data.set(props.modelValue);

                    })
                    .catch(err => {
                        console.error(err);
                    });
        }

        function setUpEditorEvents() {

            const emitDebouncedInputEvent = debounce(evt => {

                const data = lastEditorData = instance.data.get();

                ctx.emit("update:modelValue", data, evt, instance);
                ctx.emit("input", data, evt, instance);
            }, 300, {leading: true});

            instance.model.document.on("change:data", emitDebouncedInputEvent);

        }

        onMounted(() => {
            watch(() => props.modelValue, (value) => {

                if (isInit) {
                    if (instance && value !== lastEditorData) {
                        instance.data.set(value);
                    }

                } else {
                    editorRef.value.innerHTML = value;
                }

            }, {immediate: true});
        });

        return {
            editorRef,
            initCkEditor,
            InlineEditor,
            editorConfig
        };
    }
};
</script>

<style>

</style>
