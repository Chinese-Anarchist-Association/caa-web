import {ref, type Ref} from "vue";
import {decryptString, encryptString} from "@/utils/cryptoString.ts";
import defPw from "@/json/defPw.json";

export default function (){
    //region 加密
    const encPw:Ref<string>=ref('');
    const encContent:Ref<string>=ref('');
    const encOutputContent:Ref<string> = ref('');
    const encCopyBtn_show:Ref<boolean>=ref(false);

    function encTextBtn_click(){
        encOutputContent.value = '';
        encCopyBtn_show.value=false;

        const pw:string=encPw.value.trim() || defPw.value;
        const content:string=encContent.value;
        if (content==''){
            encOutputContent.value="加密失败，待加密内容不能为空。";
            return;
        }

        //console.log(content)
        const output:string = encryptString(content,pw);
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

    function decTextBtn_click(){
        decOutputContent.value = '';

        const pw:string=decPw.value.trim() || defPw.value;
        const ipt:string = decInput.value;
        if (ipt==''){
            decOutputContent.value = '解密失败，待解密内容不能为空。';
            return;
        }

        {
            function errorDo() {
                decOutputContent.value = '解密失败，可能是密文或密钥错误';
            }

            try {
                const otpt = decryptString(ipt, pw);
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
        encPw,encContent,encTextBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
        decPw,decInput,decOutputContent,decTextBtn_click,
    }
}