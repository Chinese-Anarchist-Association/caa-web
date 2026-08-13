import {md_libraryDocs} from "@/ts/env/moduleDisable.ts";
//import {libraryDocs_baseUrl_1} from "@/ts/env/libraryDocs_baseUrl.ts";
import docsDataJson from '../json/docsData.json';
import remote_dd1 from '../json/_remote/dd-1.json';

export type DocData={
    id:number,
    //文件路径。开头不加斜杠，末尾需要添加斜杠（处于根时留空不加斜杠）
    //文件网络地址。需要以http开头（https同理）。如果以斜杠结尾，则会自动将fileName的值追加在后面
    //使用$$$ $$$包裹以携带变量
    uri:string,
    //源文件名
    //如果是.part-xxx结尾的拆分文件，则可以使用.part=[拆分文件数量]来指代
    fileName:string,
    //在显示时的类别分类
    classShow:{
        //可以与文件实际路径不同，这是自定义路径。开头要加斜杠，末尾不加斜杠
        //可填写被加密内容，在base64加密内容前添加'enc:'即可
        path:string,
        //可以与文件的实际名称不同，这是自定义名称
        //可填写被加密内容，在base64加密内容前添加'enc:'即可
        name?:string,
    }
};
export type DocsData=DocData[];/*{
    [key: string]: DocData;
};*/
const docsData: DocsData = (!md_libraryDocs) ? [
    ...docsDataJson,
    ...remote_dd1,
]:[];
export default docsData;