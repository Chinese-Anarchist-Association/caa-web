//工具：将指定目录下的所有文件按编号重命名并将文件名等数据根据DocsData类型(/src/views/Library/ts/docsData.ts)创建并输出
/*
以脚本所在目录为基础，输入目录在./input，输出目录在./output

使用方法：
node ./script/tools/renameFilesAndCreateDocsData.js --fileNum=0 --dd_classShow_path=/test
--dirNum : 目录起始编号，将从该编号开始创建目录。默认为0。目前暂未使用该参数，目前暂不支持自动重命名目录和将目录写入对象（--dirNum=0）
--fileNum : 文件起始编号，将从该编号开始命名文件。默认为0
--dd_path : 需要自动填入docsData对象的值。当前参数暂未使用，目前可自动检测并填入该值（--dd_path=test/）
--dd_classShow_path : 需要自动填入docsData对象的值
*/

const logHeader = '[renameFilesAndCreateDocsData.js]';

import fs from 'fs';
import path from 'path';
import checkDir from "../js/checkDir.js";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.resolve(__dirname, './input');
const outputDir = path.resolve(__dirname, './output');

let dirNum = undefined;//0;
let fileNum = 0;
//let dd_path = '';
let dd_classShow_path = '/';

const args = process.argv
    .slice(2);//移除前两个默认参数，只接收用户参数
args.forEach(arg => {
    const argSp = arg.split('=');
    switch (argSp[0]) {
        /*case '--dirNum':
            dirNum = argSp[1];
            break;*/
        case '--fileNum':
            fileNum = argSp[1];
            break;
        /*case '--dd_path':
            dd_path = argSp[1];
            break;*/
        case '--dd_classShow_path':
            dd_classShow_path = argSp[1];
            break;
    }
});

console.log(`${logHeader} 即将开始操作。目录起始编号：${dirNum}；文件起始编号：${fileNum}；输入目录：${inputDir}；输出目录：${outputDir}`);

if (fs.existsSync(inputDir) && fs.existsSync(outputDir)) {
    checkDir(outputDir, true);
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
    //递归获取所有目录的完整路径
    /*function getAllDirectories(dir) {
        let results = [];
        const list = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of list) {
            const fullPath = path.resolve(dir, item.name);
            if (item.isDirectory()) {
                results.push(...getAllDirectories(fullPath));
                results.push(fullPath);
            }
        }
        return results;
    }*/
    
    const docsData = [];
    
    const allFiles = getAllFiles(inputDir);
    allFiles.forEach(ffp => {//file full path
        //file info
        const fi = path.parse(ffp);
        //基于inputDir的相对目录
        const relativeDir = path.relative(inputDir, fi.dir);
        //将其拼接到outputDir目录中
        const opDir = path.join(outputDir, relativeDir);

        //将要移动到的目标完整路径
        const moveTarget = path.join(opDir, `${fileNum}${fi.ext}`);
        //console.log(relativeDir, opDir, moveTarget);
        try {
            checkDir(opDir);
            fs.renameSync(ffp, moveTarget);
            console.log(`${logHeader} 文件操作成功：${ffp} ==> ${moveTarget}`);
        } catch (e) {
            console.error(`${logHeader} 文件操作失败：${ffp} =/=> ${moveTarget}  ，`, e);
        }
        docsData.push({
            id: Number(fileNum),
            path: (relativeDir != '') ? `${relativeDir.replaceAll('\\', '/')}/` : '',
            fileName: path.basename(moveTarget),
            classShow: {
                path: dd_classShow_path,
                name: fi.base,
            },
        });
        fileNum++;
    });
    console.log(`${logHeader} docsData对象输出：`, docsData);
} else {
    console.error(`${logHeader} 检测到有目录不存在，操作中断。`);
}