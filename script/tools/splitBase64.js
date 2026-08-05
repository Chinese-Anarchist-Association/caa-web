/*
工具：将指定目录下的所有base64文本文件拆分
以脚本所在目录为基础，输入目录在./input，输出目录在./output

使用方法：
node ./script/tools/splitBase64.js [每个文件的大小(单位：B)]
 */
const logHeader = '[splitBase64.js]';

import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import {processDirectory} from "../js/EncOrDecAllFiles.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import checkDir from "../js/checkDir.js";

const inputDir = path.resolve(__dirname, './input');
const outputDir = path.resolve(__dirname, './output');

/**
 * 将Base64文本文件拆分为多个部分
 * @param {number} chunkSizeB 每个文件的大小（B）
 * @param {string} inputFile 待拆分的b64文件路径
 * @param {string} od 输出目录
 * @returns {string[]} 生成的文件路径列表
 */
function splitBase64File(chunkSizeB, inputFile, od) {
    //检查输入文件
    if (!fs.existsSync(inputFile)) {
        throw new Error(`文件不存在: ${inputFile}`);
    }

    //创建输出目录
    fs.mkdirSync(od, { recursive: true });

    //读取整个Base64文本
    const content = fs.readFileSync(inputFile, 'utf8');
    const totalLength = content.length;

    const partFiles = [];
    let start = 0;
    let partIndex = 1;

    while (start < totalLength) {
        const end = Math.min(start + chunkSizeB, totalLength);
        const partContent = content.slice(start, end);

        const partName = `${path.basename(inputFile)}.part-${String(partIndex)/*.padStart(3, '0')*/}`;
        const partPath = path.join(od, partName);
        fs.writeFileSync(partPath, partContent, 'utf8');

        partFiles.push(partPath);
        start = end;
        partIndex++;
    }

    return partFiles;
}

//递归获取所有文件的完整路径
function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
        const fullPath = path.resolve(dir, item.name);
        if (item.isDirectory()) results.push(...getAllFiles(fullPath));
        else if (item.isFile()) results.push(fullPath);
    }
    return results;
}


const args = process.argv
    .slice(2);//移除前两个默认参数，只接收用户参数

console.log(`${logHeader} 即将开始操作。输入目录：${inputDir}；输出目录：${outputDir}`);

checkDir(outputDir,true);
const af=getAllFiles(inputDir);
af.forEach(ffp => {//file full path
    //基于inputDir的相对目录
    const relativeDir = path.relative(inputDir, path.dirname(ffp));
    //将其拼接到outputDir目录中
    const opDir = path.join(outputDir, relativeDir);

    const spfiles = splitBase64File(Number(args[0]),ffp,opDir);
    console.log(`${logHeader} 操作完成：${ffp} ===> ${spfiles}`);
});