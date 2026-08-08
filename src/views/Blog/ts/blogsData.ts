import blogsDataJson from '@/views/Blog/json/blogsData.json';

export type IsEnc='enc'|string;
export type FileType='md'|'mdz'|string;

export type BlogData={
    id:number,
    blog:{
        //文件相对路径。开头不加斜杠，需包含完整文件名
        //文件完整网络地址。需要以http开头（https同理）。
        //使用$$$ $$$包裹以携带变量
        uri:string,
        //文件类型
        fileType:FileType,
        //文件是否加密。填入文件后缀即可
        isEnc?:IsEnc,
    }
    cover:{
        //博客封面标题
        title:string,
        //博客封面概要
        summary:string,
        //封面图片
        image?:{
            //文件相对路径。开头不加斜杠，需包含完整文件名
            //文件完整网络地址。需要以http开头（https同理）。
            //使用$$$ $$$包裹以携带变量
            uri:string,
            //文件是否加密。填入文件后缀即可
            isEnc?:IsEnc,
        }
    }
    //博客创建时间，使用ISO 8601标准的时间字符串，例如：2026-05-13T00:11:10+08:00
    creationTime:string,
    //博客最后修改时间，使用ISO 8601标准的时间字符串，例如：2026-05-13T00:11:10+08:00
    lastModificationTime:string,
    //博客类型键，用于给博客分类
    blogTypeKey:string[],
    //作者
    author:string[],
}
export type BlogsData=BlogData[];

const blogsData:BlogsData=[
    ...blogsDataJson,
];

export default blogsData;