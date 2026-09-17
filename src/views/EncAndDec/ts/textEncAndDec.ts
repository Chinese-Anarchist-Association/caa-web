import {ref, type Ref} from "vue";
import {decryptString, encryptString} from "@/utils/cryptoString.ts";
import defPw from "@/json/defPw.json";
import {decryptWordArray, encryptWordArray, HexToWordArray, WordArrayToHex} from "@/utils/cryptoWordArray.ts";
import {base62ToHex, hexToBase62} from "@/utils/base62.ts";
import {base94ToHex, hexToBase94} from "@/utils/base94.ts";
import {base1024ToHex, hexToBase1024} from "@/utils/base1024.ts";

export default function (){
    //region 加密
    const encPw:Ref<string>=ref('');
    const encContent:Ref<string>=ref('');
    const encBase:Ref<number>=ref(64);
    const encOutputContent:Ref<string> = ref('');
    const encCopyBtn_show:Ref<boolean>=ref(false);

    function encTextBtn_click(){
        encOutputContent.value = '';
        encCopyBtn_show.value=false;

        const pw:string=encPw.value.trim() || defPw.value;
        const content:string=encContent.value;
        const base:number=Number(encBase.value);
        if (content==''){
            encOutputContent.value="加密失败，待加密内容不能为空。";
            return;
        }

        //console.log(content)
        //console.log(base)
        let output:string;
        switch (base){
            case 64:
                output = encryptString(content,pw);
                break;
            case 16:
            case 62:
            case 94:
            case 1024:
            {
                const encHex=WordArrayToHex(encryptWordArray(content,pw));
                switch (base){
                    case 16:
                        output=encHex;
                        break;
                    case 62:
                        output=hexToBase62(encHex);
                        break;
                    case 94:
                        output=hexToBase94(encHex);
                        break;
                    case 1024:
                        output=hexToBase1024(encHex);
                        break;
                }
            }
                break;
            default:
                encOutputContent.value="加密失败，基错误。";
                return;
        }
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
    const decBase:Ref<number>=ref(64);
    const decOutputContent:Ref<string> = ref('');

    function decTextBtn_click(){
        decOutputContent.value = '';

        const pw:string=decPw.value.trim() || defPw.value;
        const ipt:string = decInput.value;
        const base:number=Number(decBase.value);
        if (ipt==''){
            decOutputContent.value = '解密失败，待解密内容不能为空。';
            return;
        }

        {
            function errorDo() {
                decOutputContent.value = '解密失败，可能是密文或密钥错误';
            }

            try {
                let otpt:string ;//= decryptString(ipt, pw);
                switch (base){
                    case 64:
                        otpt = decryptString(ipt, pw);
                        break;
                    case 16:
                    case 62:
                    case 94:
                    case 1024:
                    {
                        let decHex:string;
                        switch (base){
                            case 16:
                                decHex=ipt;
                                break;
                            case 62:
                                decHex=base62ToHex(ipt);
                                break;
                            case 94:
                                decHex=base94ToHex(ipt);
                                break;
                            case 1024:
                                decHex=base1024ToHex(ipt);
                                break;
                        }
                        otpt = decryptWordArray(HexToWordArray(decHex),pw);
                    }
                        break;
                    default:
                        encOutputContent.value="解密失败，基错误。";
                        return;
                }
                if (otpt!='') {
                    decOutputContent.value = otpt;
                }else errorDo();
            } catch {
                errorDo();
            }
        }
    }
    //endregion

    return{
        encPw,encBase,encContent,encTextBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
        decPw,decBase,decInput,decOutputContent,decTextBtn_click,
    }
}