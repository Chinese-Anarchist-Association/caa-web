const logHeader = '[EncOrDecAllFiles.js]';

import fs from 'fs/promises';
import path from 'path';
import CryptoJS from 'crypto-js';

//region 加解密逻辑
/**
 * 加密Uint8Array
 * @param data 待加密的Uint8Array
 * @param password 密码
 * @returns string 返回加密后的OpenSSL格式的Base64字符串
 */
export function encryptUint8Array(data, password) {
    const wordArray = CryptoJS.lib.WordArray.create(data);
    const encrypted = CryptoJS.AES.encrypt(wordArray, password);
    return encrypted.toString();
}

/**
 * 解密Base64密文
 * @param base64Str 被加密的Base64字符串
 * @param password 密码
 * @returns Uint8Array 返回解密后的原始Uint8Array
 */
export function decryptUint8Array(base64Str, password) {
    const decrypted = CryptoJS.AES.decrypt(base64Str, password);
    //从WordArray中提取出字节长度并实例化Uint8Array
    const byteArray = new Uint8Array(decrypted.sigBytes);
    for (let i = 0; i < decrypted.sigBytes; i++) {
        //从words数组中按位提取每个字节
        byteArray[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return byteArray;
}
//endregion

//region 加解密文件处理逻辑
//加密单个文件
async function encryptFile(inputPath, outputPath, password) {
    const buffer = await fs.readFile(inputPath);
    const data = new Uint8Array(buffer);
    const encryptedStr = encryptUint8Array(data, password);
    //Base64字符串，以UTF-8写入
    await fs.writeFile(outputPath, encryptedStr, 'utf8');
}

//解密单个文件
async function decryptFile(inputPath, outputPath, password) {
    const encryptedStr = await fs.readFile(inputPath, 'utf8');
    const decryptedData = decryptUint8Array(encryptedStr, password);
    //二进制数据写入
    await fs.writeFile(outputPath, Buffer.from(decryptedData));
}
//endregion

/**
 * 递归处理目录
 * @param {string} id 输入目录
 * @param {string} od 输出目录
 * @param {string} mode enc, dec
 * @param {string} password 密码
 */
export async function processDirectory(id, od, mode, password) {
    //确保输出目录存在
    await fs.mkdir(od, { recursive: true });

    const entries = await fs.readdir(id, { withFileTypes: true });

    for (const entry of entries) {
        const inputPath = path.join(id, entry.name);
        const outputPath = path.join(od, (()=>{
            if (entry.isDirectory())
                return entry.name;
            else {
                switch (mode) {
                    case 'enc':
                        return `${entry.name}.enc`;
                    case 'dec': {
                        const tg = '.enc';
                        if (entry.name.endsWith(tg))
                            return entry.name.slice(0, -tg.length);
                        else
                            return entry.name;
                    }
                }
            }
        })());

        if (entry.isDirectory()) {
            // 递归处理子目录
            await processDirectory(inputPath, outputPath, mode, password);
        } else if (entry.isFile()) {
            console.log(`${logHeader}文件操作成功：${inputPath} ==> ${outputPath}`);
            switch (mode){
                case 'enc':
                    await encryptFile(inputPath, outputPath, password);
                    break;
                case 'dec':
                    await decryptFile(inputPath, outputPath, password);
                    break;
                default:
                    throw new Error(`${logHeader}模式输入错误: ${mode}`);
            }
        }
    }
}