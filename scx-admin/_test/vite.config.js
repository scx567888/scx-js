import vuePlugin from "@vitejs/plugin-vue";
import {scxIconPluginUseJS, scxLoadingPlugin} from "@scx-js/scx-vite-plugin";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";


export default {
    base: "./",
    server: {
        port: 3000,
    },
    plugins: [
        vuePlugin(),
        scxIconPluginUseJS([resolve(dirname(fileURLToPath(import.meta.url)), "./src/icons")]),
        scxLoadingPlugin(),
    ],
    optimizeDeps: {
        include: [],
    },
};
