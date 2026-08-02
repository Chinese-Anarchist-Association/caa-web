import {md_libraryDocs_get} from "../../src/ts/env/moduleDisable.node";
import path from "path";

export default function (env:Record<string, string>,dirname:string){
    let output={};
    if (md_libraryDocs_get(env))
        //如果该模块禁用，则将glob导入改为空文件，避免将匹配的文件构建至输出目录
        output = {
            ...output,
            '@@glob/libraryDocFiles.ts': path.resolve(dirname,'./src/glob/libraryDocFiles.empty.ts')//'@/glob/libraryDocFiles.empty.ts'
        }
    else
        output = {
            ...output,
            '@@glob/libraryDocFiles.ts': path.resolve(dirname,'./src/glob/libraryDocFiles.ts')
        }
    return output;
}