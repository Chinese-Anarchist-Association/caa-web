import {type Ref, ref} from "vue";
import {getFormatTimeWithTimezone} from "@/utils/date_timezone.ts";
//import {decUint8ArrayToString, encStringToUint8Array} from "@/utils/cryptoUint8Array.ts";
//import {base94Decode, base94Encode} from "@/utils/base94.ts";
//import {decryptString, encryptString} from "@/utils/cryptoString.ts";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import base1024Random from "@/utils/base1024Random.ts";
import seedrandom from "seedrandom";
import {decryptWordArray, encryptWordArray, HexToWordArray, WordArrayToHex} from "@/utils/cryptoWordArray.ts";
//import {base1024ToBase64, BASE64, base64ToBase1024} from "@/utils/base1024.ts";

dayjs.extend(utc);

function getSeed(){
    return dayjs.utc(new Date().toISOString()).format('YYYY-MM-DD_HH');
}

const seed:string = getSeed();
const {base16ToBase1024R,base1024RToBase16}=base1024Random(seed);

export default function (){
    type DataType={
        d:string,//date
        e?:string,//extra
    };

    function getOTPW(){//one-time password
        /*const testOp=`${seed}/${seedrandom(seed)()}`;
        console.log(testOp);
        return testOp;*/
        return `${seed}/${seedrandom(seed)()}`;
    }

    function doEnc(c:string, p:string){
        //console.log(encryptWordArray(c,p),WordArrayToHex(encryptWordArray(c,p)))
        return base16ToBase1024R(WordArrayToHex(encryptWordArray(c,p)));
        /*{
            const test=encryptWordArray(c,p);
            const test2=decryptWordArray(test, p);
            console.log(test2);
        }*/
        /*const wa=encryptWordArray(c,p);
        const hex=WordArrayToHex(wa);
        const b1024=base16ToBase1024R(hex);
        //console.log(p)
        console.log(c, wa, hex, b1024);
        return b1024;*/
    }
    function doDec(b:string,p:string){
        //console.log(HexToWordArray(base1024RToBase16(b)),base1024RToBase16(b))
        return decryptWordArray(HexToWordArray(base1024RToBase16(b)),p);
        /*const hex=base1024RToBase16(b);
        const wa=HexToWordArray(hex);
        const str=decryptWordArray(wa,p);
        //console.log(p)
        console.log(b, hex, wa, str);
        return str;*/
    }

    //region 加密
    const encPw:Ref<string>=ref('');
    const encExtraCt:Ref<string>=ref('');
    const encOutputContent:Ref<string> = ref('');
    const encCopyBtn_show:Ref<boolean>=ref(false);

    function encBtn_click(){
        //console.log(dayjs.utc(new Date().toISOString()).format('YYYYMMDDHH'),dayjs(new Date().toISOString()).format('YYYYMMDDHH'),new Date().toISOString())
        encOutputContent.value = '';
        encCopyBtn_show.value=false;

        const pw:string=`${encPw.value.trim()}::${getOTPW()}`;
        //console.log(pw);
        /*{
            const b1024r=base64ToBase1024R(`B${BASE64}`);
            const b64=base1024RToBase64(b1024r);
            console.log(`B${BASE64}`,b1024r,b64);
            const t1=base64ToBase1024(BASE64);
            const t2=base1024ToBase64(t1);
            console.log(BASE64,t1, t2)
            if (BASE64!=b64){

            }
        }*/
        if (seed!==getSeed()){
            encOutputContent.value = '加密失败，当前页面已过时，请刷新';
            return;
        }

        const content:string=JSON.stringify((()=>{
            if (encExtraCt.value!=''){
                return {
                    d: new Date().toISOString(),
                    e: encExtraCt.value,
                } as DataType;
            }else{
                return {
                    d: new Date().toISOString(),
                } as DataType;
            }
        })());
        const output:string = doEnc(content,pw);
        {
            function encError(){
                encOutputContent.value = '加密失败，加密时出现异常，请重试';
                encCopyBtn_show.value = false;
            }
            try {
                //保险起见，加密后验证一下能否解密
                if (doDec(output,pw)==content) {
                    encOutputContent.value = `${output}`;
                    encCopyBtn_show.value = true;
                }else encError();
            } catch {
                encError();
            }
        }
    }

    //复制按钮点击
    async function encCopyBtn_click(){
        await navigator.clipboard.writeText(encOutputContent.value);
    }
    //endregion
    //region 解密
    const decPw:Ref<string>=ref('');
    const decInput:Ref<string>=ref('');
    const decOutputContent:Ref<string> = ref('');

    function decCopyBtn_click(){
        decOutputContent.value = '';

        const pw:string=`${decPw.value.trim()}::${getOTPW()}`;
        //console.log(pw);
        const ipt:string = decInput.value;
        if (ipt==''){
            decOutputContent.value = '解密失败，密文不能为空';
            return;
        }
        if (seed!==getSeed()){
            decOutputContent.value = '解密失败，当前页面已过时，请刷新';
            return;
        }

        try {
        //console.log(base1024RToBase64(ipt),decryptString(base1024RToBase64(ipt),pw));
            const content: DataType = JSON.parse(doDec(ipt, pw));
            decOutputContent.value =
                `解密成功：\r\n时间：${getFormatTimeWithTimezone(content.d)}${(content.e) ? `\r\n附加内容：${content.e}` : ''}`;
        }catch {
            decOutputContent.value = '解密失败，可能是密文或密钥错误，或密文已过期';
        }
    }
    //endregion

    return{
        encPw,encExtraCt,encBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
        decPw,decInput,decOutputContent,decCopyBtn_click,
    }
}