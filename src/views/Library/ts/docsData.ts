export type DocData={
    id:number,
    //文件路径。开头不加斜杠，末尾需要添加斜杠（处于根时留空不加斜杠）
    path:string,
    fileName:string,
    //在显示时的类别分类
    classShow:{
        //可以与文件实际路径不同，这是自定义路径。开头要加斜杠，末尾不加斜杠
        path:string,
        //可以与文件的实际名称不同，这是自定义名称
        name?:string,
    }
};
export type DocsData=DocData[];/*{
    [key: string]: DocData;
};*/
const docsData:DocsData=[
    {
        id:-1,
        path: 'test/',
        fileName:'test.pdf',
        classShow:{
            path:'/test',
        }
    },
    {
        id: -2,
        path: 'test/',
        fileName: 'test.docx',
        classShow:{
            path: '/test2',
        }
    },
];
export default docsData;