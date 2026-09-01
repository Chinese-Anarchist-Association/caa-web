import {createRouter, createWebHashHistory,createMemoryHistory , createWebHistory} from 'vue-router';
import renderMode from "@/ts/env/renderMode.ts";
import {isServer} from "@/ts/env/ssr.ts";
import baseUrl from "@/ts/env/baseUrl.ts";
import libraryRouter from "@/router/library.router.ts";
import lazyLoadGuard from "@/utils/router/lazyLoadGuard.ts";
import blogRouter from "@/router/blog.router.ts";
//import isTrueCaa from "@/ts/global/isTrueCaa.ts";

const router = createRouter({
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
            component: lazyLoadGuard(() => import('@/views/Home/Home.vue')),
        },
        {
            path: '/nothing',
            name: 'nothing',
            component: lazyLoadGuard(() => import('@/views/Nothing/Nothing.vue')),
        },
        {
            path: '/JoinUs',
            name: 'joinUs',
            component: lazyLoadGuard(() => import('@/views/JoinUs/JoinUs.vue')),
        },
        {
            path: '/MotionMatrix',
            name: 'motionMatrix',
            component: lazyLoadGuard(() => import('@/views/MotionMatrix/MotionMatrix.vue')),
        },
        {
            path: '/Library',
            name: 'library',
            component: lazyLoadGuard(() => import('@/views/Library/Library.vue')),
        },
        ...libraryRouter(),
        {
            path: '/EncAndDec',
            name: 'encAndDec',
            component: lazyLoadGuard(() => import('@/views/EncAndDec/EncAndDec.vue')),
        },
        {
            path: '/Blog',
            name: 'blog',
            component: lazyLoadGuard(()=>import('@/views/Blog/Blog.vue')),
        },
        ...blogRouter(),
        {
            path: '/OnlineSelfVerificationor',
            name: 'onlineSelfVerificationor',
            component: lazyLoadGuard(()=>import('@/views/OnlineSelfVerificationor/OnlineSelfVerificationor.vue')),
        },
        {
            path:'/hidden/AParty',
            name: 'aParty',
            component: lazyLoadGuard(()=>import('@/views/AParty/AParty.vue')),
        },
        {
            path: '/Posters',
            name: 'posters',
            component: lazyLoadGuard(()=>import('@/views/Posters/Posters.vue')),
        },
        {
            path: '/ShareLink',
            name: 'shareLink',
            component: lazyLoadGuard(()=>import('@/views/ShareLink/ShareLink.vue')),
        },



        {
            path: '/404',//使预渲染工具构建一个404.html以供github page使用
            name: '404',
            component: lazyLoadGuard(()=>import('@/views/404.vue')),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: lazyLoadGuard(()=>import('@/views/404.vue')),
        },
    ],
});
//此方法无法成功在资源加载前拦截
/*router.beforeEach((to, _from) => {
    if (!(isTrueCaa.value===true)){//如果不成立则不加载任何路由
        console.log('test')
        if (to.path === '/nothing')//如果已经被拦截，则放行，避免死循环
            return true;
        return { path: '/nothing', replace: true };//拦截
    }
    return true;
});*/

export default router;