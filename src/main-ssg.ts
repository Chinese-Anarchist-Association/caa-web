import {ViteSSG} from "vite-ssg";
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";
import sharedFunc from '@/ts/main/shared.ts';
import {isDev} from "@/ts/env/packMode.ts";

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'virtual:svg-icons-register';//vite-plugin-svg-icons的虚拟模块
import '@/assets/css/global/unSelect.css';
import 'github-markdown-css/github-markdown.css';

export default function () {
    if (isDev) console.log(`[main-ssg.ts] 进入`);

    const createApp = ViteSSG(
        App,
        router.options,
        ({app, isClient}) => {
            app.use(i18n);

            if (isClient) {
                import('bootstrap').then(() => {
                    if (isDev)
                        console.log('[main-ssg.ts] Bootstrap Js 已动态载入');
                }).catch(err => {
                    if (isDev)
                        console.error('[main-ssg.ts] Bootstrap Js 动态载入失败：', err);
                });
            }
        },
    );

    sharedFunc();

    return {createApp};
}