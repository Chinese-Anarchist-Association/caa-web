import type {RouteRecordRaw} from "vue-router";
import docsData from "@/views/Library/ts/docsData.ts";

export default (():RouteRecordRaw[]=>{
    let rrr:RouteRecordRaw[]=[];
    docsData.forEach((dd)=>{
        rrr.push({
            path: `/Library/doc/${dd.id}`,
            name: `library_doc-${dd.id}`,
            component: () => import('@/views/Library/LibraryDocShow.vue'),
            meta:{
                doc_id:dd.id,
            }
        });
    });
    return rrr;
})