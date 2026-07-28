import {createRouter, createWebHashHistory,createMemoryHistory , createWebHistory} from 'vue-router';
import renderMode from "@/ts/env/renderMode.ts";
import {isServer} from "@/ts/env/ssr.ts";
import baseUrl from "@/ts/env/baseUrl.ts";
import libraryRouter from "@/router/library.router.ts";

export default createRouter({
    history: (()=>{
        switch (renderMode){
            case 'ssg':
                return isServer ? createMemoryHistory() : createWebHistory(baseUrl||'/');
            case 'spa':
                return createWebHistory(baseUrl||'/');
            case 'spa-hash':
                return createWebHashHistory();//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
            default:
                throw new Error(`Unknown RENDER_MODE: ${renderMode}`);
        }
    })(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/Home.vue'),
        },
        {
            path: '/AboutUs',
            name: 'aboutUs',
            component: () => import('@/views/AboutUs/AboutUs.vue'),
        },
        {
            path: '/JoinUs',
            name: 'joinUs',
            component: () => import('@/views/JoinUs/JoinUs.vue'),
        },
        {
            path: '/MotionMatrix',
            name: 'motionMatrix',
            component: () => import('@/views/MotionMatrix/MotionMatrix.vue'),
        },
        {
            path: '/Library',
            name: 'library',
            component: () => import('@/views/Library/Library.vue'),
        },
        ...libraryRouter(),
    ],
});