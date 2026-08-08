//博客内容的基链接
const blogContent_baseUrl:{
    [key: string]:string,
}= {
    blogContent_baseUrl_1:import.meta.env.VITE_BLOGCONTENT_BASEURL_1 as string,
}
export default blogContent_baseUrl;