export type DocData={
    id:number,
    //文件路径。开头不加斜杠，末尾需要添加斜杠（处于根时留空不加斜杠）
    path:string,
    fileName:string,
    //在显示时的类别分类
    classShow:{
        path:string,
        name?:string,
    }
};
export type DocsData=DocData[];/*{
    [key: string]: DocData;
};*/
const docsData:DocsData=[
    {
        id:-1,
        path:'',
        fileName:'test.pdf',
        classShow:{
            path:'/test',
        }
    }
];
export default docsData;