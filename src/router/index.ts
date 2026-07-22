import {createRouter, createWebHashHistory,createMemoryHistory , createWebHistory} from 'vue-router';
import toolRouter from './tool.router';
import renderMode from "@/ts/env/renderMode.ts";

export default createRouter({
    history: (()=>{
        switch (renderMode){
            case 'ssg':
                return import.meta.env.SSR ? createMemoryHistory() : createWebHistory();
            case 'spa':
                return createWebHistory();
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
            path:'/toollist',
            name:'toolList',
            component:()=>import('@/views/ToolList/ToolList.vue'),
        },
        ...toolRouter,
    ],
});