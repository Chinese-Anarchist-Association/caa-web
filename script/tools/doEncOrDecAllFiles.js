/*
使用方法：
node ./script/tools/doEncOrDecAllFiles.js [加密或解密：enc或dec] [密码]
 */

const logHeader = '[doEncOrDecAllFiles.js]';

import fs from "fs";
import path from 'path';
//import checkDir from "../js/checkDir.js";
import { fileURLToPath } from 'url';
import {processDirectory} from "../js/EncOrDecAllFiles.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import checkDir from "../js/checkDir.js";

const inputDir = path.resolve(__dirname, './input');
const outputDir = path.resolve(__dirname, './output');

const args = process.argv
    .slice(2);//移除前两个默认参数，只接收用户参数

console.log(`${logHeader} 即将开始操作。输入目录：${inputDir}；输出目录：${outputDir}`);

if (fs.existsSync(inputDir)){
    checkDir(outputDir, true);
    processDirectory(inputDir, outputDir, args[0], args[1]);
}else {
    console.error(`${logHeader} 检测到输入目录不存在，操作中断。`);
}