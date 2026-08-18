import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";
import sharedFunc from '@/utils/main/shared.ts';
import {isDev} from "@/ts/env/packMode.ts";

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'bootstrap';
import '@/assets/css/global/unSelect.css';

export default function () {
    if (isDev) console.log(`[main-spa.ts] 进入`);

    createApp(App)
        .use(router)
        .use(i18n)
        .mount('#app');

    sharedFunc();
}