//是否禁用图书馆文档模块
export const md_libraryDocs:boolean=Boolean(process.env.VITE_MD_LIBRARYDOCS || false);
export function md_libraryDocs_get(env: Record<string, string>):boolean {
    return Boolean(env.VITE_MD_LIBRARYDOCS || false);
}