//图书馆文档的基链接
//export const libraryDocs_baseUrl_1:string=import.meta.env.VITE_LIBRARYDOCS_BASEURL_1;

//图书馆文档的基链接
export const libraryDocs_baseUrl:{
    [key: string]:string,
}={
    libraryDocs_baseUrl_1:import.meta.env.VITE_LIBRARYDOCS_BASEURL_1 as string,
}
export default libraryDocs_baseUrl;