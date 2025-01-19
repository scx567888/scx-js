import {createApp} from "vue";
import App from "./App.vue";
import {Router} from "./router";
import {ScxComponent} from "../../index.js";
import {ScxFSS} from "@scx-js/scx-app-x";
import "@scx-js/scx-ui/style/default.css";
import "@scx-js/scx-ui/style/dark.css";
import "scx-icon/register";
import {ScxReq} from "@scx-js/scx-http";

const scxReq = new ScxReq("http://127.0.0.1:8081");
const scxFSS = new ScxFSS(scxReq);

createApp(App)
    .use(Router)
    .use(ScxComponent)
    .use(scxReq)
    .use(scxFSS)
    .mount("#app");
