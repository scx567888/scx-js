import vue from "@vitejs/plugin-vue";
import {scxIconPluginUseJS} from "@scx-js/scx-vite-plugin";
import {scxLoadingPlugin} from "@scx-js/scx-vite-plugin/scx-loading-vite-plugin";

export default {
    base: "./",
    plugins: [
        vue({}),
        scxIconPluginUseJS(["no-icons"]),
        scxLoadingPlugin(),
    ],
};
