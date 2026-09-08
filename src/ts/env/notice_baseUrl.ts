//公告内容基链接
const notice_baseUrl:{
    [key: string]:string,
}= {
    notice_baseUrl_1:import.meta.env.VITE_NOTICE_BASEURL_1 as string,
}
export default notice_baseUrl;