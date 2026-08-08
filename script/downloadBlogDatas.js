const logHeader='[downloadDocDatas.js.js] ';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import checkDir from "./js/checkDir.js";
import { writeFile } from 'node:fs/promises';


const outputDir=path.resolve(__dirname, '../src/views/Blog/json/_remote');

//console.log(outputDir);

checkDir(outputDir,true);

const ddDatas=[//需要下载的外部数据数组
    {
        fileName: 'bd-1.json',
        url: 'https://raw.githubusercontent.com/Chinese-Anarchist-Association/caa-web_blog-content/refs/heads/main/blogsData.json',
    },
];

(async () => {
    for (const data of ddDatas) {
        console.log(`${logHeader}开始下载${data.url}`);
        const res=await fetch(data.url);

        if(res.ok){
            const targetFilePath=path.join(outputDir,data.fileName);
            const buffer = await res.arrayBuffer();
            await writeFile(targetFilePath,Buffer.from(buffer));
            console.log(`${logHeader}文件已保存至：${targetFilePath}`);
        }else
            throw new Error(`${logHeader} ${data.url}下载失败。状态码：${res.status}`);
    }
})();
