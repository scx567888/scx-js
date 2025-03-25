<p align="center">
    <img src="https://scx.cool/scx-logo/scx-js-logo.svg" width="300px"  alt="scx-js-logo"/>
</p>
<p align="center">
    <a target="_blank" href="https://github.com/scx567888/scx-js/actions/workflows/ci.yml">
        <img src="https://github.com/scx567888/scx-js/actions/workflows/ci.yml/badge.svg" alt="CI"/>
    </a>
    <a target="_blank" href="https://www.npmjs.com/package/@scx-js/scx-ui">
        <img src="https://img.shields.io/npm/v/@scx-js/scx-ui.svg?color=ff69b4" alt="npm package"/>
    </a>
    <a target="_blank" href="https://github.com/scx567888/scx-js">
        <img src="https://img.shields.io/github/languages/code-size/scx567888/scx-js?color=orange" alt="code-size"/>
    </a>
    <a target="_blank" href="https://github.com/scx567888/scx-js/issues">
        <img src="https://img.shields.io/github/issues/scx567888/scx-js" alt="issues"/>
    </a> 
    <a target="_blank" href="https://github.com/scx567888/scx-js/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/scx567888/scx-js" alt="license"/>
    </a>
</p>
<p align="center">
   <a target="_blank" href="https://github.com/vitejs/vite">
        <img src="https://img.shields.io/badge/Vite-f44336" alt="Vite"/>
    </a>
    <a target="_blank" href="https://github.com/cheeriojs/dom-serializer">
        <img src="https://img.shields.io/badge/dom--serializer-ff8000" alt="dom-serializer"/>
    </a>
    <a target="_blank" href="https://github.com/fb55/htmlparser2">
        <img src="https://img.shields.io/badge/htmlparser2-44be16" alt="htmlparser2"/>
    </a>
    <a target="_blank" href="https://github.com/vuejs/core">
        <img src="https://img.shields.io/badge/vue-29aaf5" alt="vue"/>
    </a> 
    <a target="_blank" href="https://github.com/zenorocha/clipboard.js">
        <img src="https://img.shields.io/badge/clipboard-9c27b0" alt="clipboard.js"/>
    </a>
</p>

English | [简体中文](./README.zh-CN.md)

> Some front end UI kits for SCX

## NPM

```
npm install @scx-js/xxx
```

## Quick start

#### 1. Install the vite plugin for ScxIcon .

```javascript
import {scxIconPluginUseJS} from '@scx-js/scx-vite-plugin';

export default {
    base: './',
    plugins: [scxIconPluginUseJS( // or scxIconPluginUseHtml
        'your-svg-root' //your svg icon root, It can also be an array []
    )]
}
```

#### 2. Install vue component for ScxIcon .

```javascript
import {createApp} from 'vue';
import {ScxComponent} from '@scx-js/scx-ui';
import App from './App.vue';
import '@scx-js/scx-ui/style/default.css'; // Don't forget to import theme
import '@scx-js/scx-ui/style/dark.css';
import 'scx-icon/register'; //if type = js you need import this virtual module

createApp(App)
    .use(ScxComponent)
    .mount('#app');
```

#### 3. Use ScxIcon component .

```html
<!-- You will see a smile face icon -->
<scx-icon icon="outlined-face-smile"/>
```

For more information, see [docs](https://scx.cool/docs/scx/index.html)

## Stats

![Alt](https://repobeats.axiom.co/api/embed/629bece55bf6fe25ba74a28a50bff9488c68da44.svg "Repobeats analytics image")
