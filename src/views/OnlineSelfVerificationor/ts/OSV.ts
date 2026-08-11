import {type Ref, ref} from "vue";
import {getFormatTimeWithTimezone} from "@/utils/date_timezone.ts";
//import {decUint8ArrayToString, encStringToUint8Array} from "@/utils/cryptoUint8Array.ts";
//import {base94Decode, base94Encode} from "@/utils/base94.ts";
import {decryptString, encryptString} from "@/utils/cryptoString.ts";
import {base1024ToBase64, base64ToBase1024} from "@/utils/base1024.ts";

export default function (){
    type DataType={
        d:string,//date
        e?:string,//extra
    };
    //region 加密
    const encPw:Ref<string>=ref('');
    const encExtraCt:Ref<string>=ref('');
    const encOutputContent:Ref<string> = ref('');
    const encCopyBtn_show:Ref<boolean>=ref(false);

    function encBtn_click(){
        encOutputContent.value = '';
        encCopyBtn_show.value=false;

        const pw:string=encPw.value.trim();
        if (pw==''){
            encOutputContent.value = "加密失败，密钥不能为空。"
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
        //console.log(content)
        const output:string = base64ToBase1024(encryptString(content,pw))//base94Encode(encStringToUint8Array(content,pw));//encryptString(content,pw);
        encOutputContent.value = `${output}`;

        encCopyBtn_show.value=true;
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

        const pw:string=decPw.value.trim();
        const ipt:string = decInput.value;
        if (ipt==''){
            decOutputContent.value = '解密失败，密文不能为空';
            return;
        }
        if (pw ==''){
            decOutputContent.value = "解密失败，密钥不能为空";
            return;
        }

        try {
            const content: DataType = JSON.parse(decryptString(base1024ToBase64(ipt),pw)/*decUint8ArrayToString(base94Decode(ipt), pw)*/);
            decOutputContent.value =
                `解密成功：\r\n时间：${getFormatTimeWithTimezone(content.d)}${(content.e) ? `\r\n附加内容：${content.e}` : ''}`;
        }catch{
            decOutputContent.value = '解密失败，可能是密文或密钥错误';
        }
    }
    //endregion

    return{
        encPw,encExtraCt,encBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
        decPw,decInput,decOutputContent,decCopyBtn_click,
    }
}