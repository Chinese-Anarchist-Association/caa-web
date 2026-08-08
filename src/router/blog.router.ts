import type {RouteRecordRaw} from "vue-router";
import blogsData from "@/views/Blog/ts/blogsData.ts";
import lazyLoadGuard from "@/utils/router/lazyLoadGuard.ts";

export default (():RouteRecordRaw[]=> {
    let rrr: RouteRecordRaw[] = [];
    blogsData.forEach(bd=>{
       rrr.push({
           path: `/Blog/content/${bd.id}`,
           name: `blog_ct-${bd.id}`,
           component: lazyLoadGuard(() => import('@/views/Blog/BlogContentView.vue')),
           meta: {
               ct_id: bd.id,
           }
       })
    });
    return rrr;
});
