<template>
    <div ref="monacoEditorDomRef" class="easy-monaco-editor"></div>
</template>
<script>
import "./index.css";
import {onMounted, ref, watch} from "vue";
import {editor} from "monaco-editor";
import "./use-worker.js";

export default {
    name: "easy-monaco-editor",
    props: {
        modelValue: {
            type: String,
            default: ""
        },
        language: {
            type: String,
            default: "javascript"
        },
        theme: {
            type: String,
            default: "vs-dark"
        }
    },
    setup(props, ctx) {

        const monacoEditorDomRef = ref();

        let currentEditor = null;

        function initEditor() {
            return editor.create(monacoEditorDomRef.value, {
                value: "",
                language: props.language,
                automaticLayout: true
            });
        }

        function startWatch() {
            watch(() => props.modelValue, (value) => {
                if (value !== currentEditor.getValue()) {
                    currentEditor.setValue(value);
                }
            }, {immediate: true});

            watch(() => props.theme, (value) => {
                editor.setTheme(value);
            }, {immediate: true});
        }

        function bindEvent() {
            currentEditor.onDidChangeModelContent((c) => {
                const value = currentEditor.getValue();
                ctx.emit("update:modelValue", value);
            });
        }

        onMounted(() => {
            currentEditor = initEditor();
            startWatch();
            bindEvent();
        });

        return {
            monacoEditorDomRef
        };
    }
};
</script>
