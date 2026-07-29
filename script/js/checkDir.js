//来源：https://github.com/MJYY-MC/MJYY_Web/blob/78c9730faec30640b578aa56ae99ca67a69cc4f5/script/js/checkDir.js

const logHeader='[checkDir.js]';

import fs from 'fs';
import path from 'path';

export default function (targetDir,doClear=false){
    if (!fs.existsSync(targetDir)) {//检查目录是否存在
        fs.mkdirSync(targetDir, { recursive: true });//递归创建目标目录
        console.log(`${logHeader} '${targetDir}'目标目录不存在，已创建`);
    }
    else{
        console.log(`${logHeader} '${targetDir}'目标目录存在`);

        if(doClear){
            const files = fs.readdirSync(targetDir, { withFileTypes: true });
            if (files.length > 0){
                console.log(`${logHeader} 检测到目录下包含文件，将执行清空：`,files);
                files.forEach(file=>{
                    const filePath = path.join(targetDir, file.name);
                    fs.rmSync(filePath, { recursive: true, force: true });
                    console.log(`${logHeader} 已删除：'${filePath}'`)
                });
            }
        }
    }
}