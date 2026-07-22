import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";
import sharedFunc from '@/ts/main/shared.ts';
import {isDev} from "@/ts/env/packMode.ts";

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'bootstrap';
import 'virtual:svg-icons-register';//vite-plugin-svg-icons的虚拟模块
import '@/assets/css/global/unSelect.css';
import 'github-markdown-css/github-markdown.css';

export default function () {
    if (isDev) console.log(`[main-spa.ts] 进入`);

    createApp(App)
        .use(router)
        .use(i18n)
        .mount('#app');

    sharedFunc();
}