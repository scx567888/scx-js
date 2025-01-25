import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CSSWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HTMLWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TSWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(workerId, label) {
        switch (label) {
            case "json":
                return new JsonWorker();
            case "css":
            case "scss":
            case "less":
                return new CSSWorker();
            case "html":
            case "handlebars":
            case "razor":
                return new HTMLWorker();
            case "typescript":
            case "javascript":
                return new TSWorker();
            default:
                return new EditorWorker();
        }
    },
};
