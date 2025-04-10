import {createApp, reactive} from "vue";
// 引入 NProgress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 引入 element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入 scx-ui
import {changeTheme, ScxComponent} from "@scx-js/scx-ui";
import "@scx-js/scx-ui/style/normalize.css"; // 主题
import "@scx-js/scx-ui/style/default.css"; // 主题
import "@scx-js/scx-ui/style/dark.css"; // 暗黑变量
// 引入 scx-admin
import {AliOSS, AuthFetch, ScxAdminComponent, ScxAuthInfo, ScxConfigManager, ScxRouter} from "@scx-js/scx-admin";
import "@scx-js/scx-admin/styles/index.css"; //导入默认样式 (注意!!! 这里导入的顺序放在最后 以便覆盖其他组件的样式)
// 引入 scx 其他模块
import {ScxFSS} from "@scx-js/scx-app-x";
import {ScxReq} from "@scx-js/scx-http";
// 引入 scx-icon 动态导入链接
import "scx-icon/register";
// 引入 App.vue
import App from "./App.vue";
// 引入 路由
import {routes} from "./routes.js";
// 引入 配置文件
import scxConfig from "../scx.config.js";
// 引入 测试认证
import {TestAuth} from "./TestAuth.js";

//配置 NProgress 不显示转圈动画
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
        .use(ScxComponent)
        .use(ScxAdminComponent)
        .use(userInfo)
        .use(auth)
        .use(req)
        .use(scxConfigManager)
        .use(fss)
        .use(aliOSS)
        .use(scxRouter)
        .mount("#app");
