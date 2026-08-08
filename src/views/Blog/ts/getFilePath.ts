import blogContentFiles from "@/glob/blogContentFiles.ts";
import blogContent_baseUrl from "@/ts/env/blogContent_baseUrl.ts";
export default function (sourceUri:string) {
    //处理变量字段后的uri字符串
    const afterActionUri = (() => {
        let output = '';
        const aauSp: string[] = sourceUri.split('$$$');
        if (aauSp.length > 1) {
            for (let i = 0; i < aauSp.length; i++) {
                if (i % 2 != 0) {
                    output += blogContent_baseUrl[aauSp[i] as string] || '';
                } else output += aauSp[i];
            }
        } else return sourceUri;
        return output;
    })();

    if (afterActionUri.startsWith('http')) {
        return afterActionUri;
    } else {
        return blogContentFiles[`/src/views/Blog/content/${afterActionUri}`] as string;
    }
}