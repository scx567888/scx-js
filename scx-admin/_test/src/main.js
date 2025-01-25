import {createApp, reactive} from "vue";
import "nprogress/nprogress.css"; // 上方进度条 样式表
import "element-plus/dist/index.css"; // element-plus 样式表
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗黑模式变量
import ElementPlus from "element-plus"; // element-plus 组件库
import {ScxComponent,  } from "@scx-js/scx-ui"; // 注册图标
import {ScxAdminComponent} from "@scx-js/scx-admin";
import App from "./App.vue";
import "@scx-js/scx-ui/style/normalize.css"; // 主题
import "@scx-js/scx-ui/style/default.css"; // 主题
import "@scx-js/scx-ui/style/dark.css"; // 暗黑变量
import "@scx-js/scx-admin/styles/index.css"; //导入默认样式 (注意!!! 这里导入的顺序放在最后 以便覆盖其他组件的样式)
import NProgress from "nprogress";
import scxConfig from "../scx.config.js";
import {AliOSS, AuthFetch, ScxAuth, ScxConfigManager, ScxRouter, ScxAuthInfo} from "@scx-js/scx-admin";
import {routes} from "./routes.js";
import "scx-icon/register";
import {ScxFSS} from "@scx-js/scx-app-x";
import {ScxReq} from "@scx-js/scx-http";
import {changeTheme} from "@scx-js/scx-ui/style/changeTheme.js";
import {TestAuth} from "./TestAuth.js";

NProgress.configure({showSpinner: false});

const userInfo = reactive(new ScxAuthInfo());

const auth = new TestAuth(userInfo, scxConfig.baseApiUrl);

const req = new ScxReq(new AuthFetch(scxConfig.baseApiUrl, auth));

const scxConfigManager = new ScxConfigManager(req, reactive(scxConfig.systemConfig), reactive(scxConfig.userConfig)).startWatch();

//添加改变主题色的监听事件
scxConfigManager.onUserConfigChange(b => changeTheme(b.dark));

const fss = new ScxFSS(req);

const aliOSS = new AliOSS();

const scxRouter = new ScxRouter({
    routes, auth, systemConfig: scxConfigManager.systemConfig, userInfo,
});

createApp(App)
        .use(ElementPlus)
        .use(scxRouter.getVueRouter())
        .use(ScxComponent)
        .use(ScxAdminComponent)
        .use(req)
        .use(fss)
        .use(userInfo)
        .use(scxConfigManager)
        .use(auth)
        .use(scxRouter)
        .use(aliOSS)
        .mount("#app");
