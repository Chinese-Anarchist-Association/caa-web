import {decryptString} from "@/utils/cryptoString.ts";
import defPw from '@/json/defPw.json';

/**
 * 检查目标字符串的开头是否包含'enc:'。
 * 如果包含，则将'enc:'后的base64密文解密后返回。
 * 否则将直接返回源文本
 * @param input
 */
function checkAndDecString(input:string):string{
    if (input.startsWith('enc:')){
        const encStr=input.split(':')[1] as string;
        return decryptString(encStr,defPw.value);
    }else return input;
}

export default checkAndDecString;