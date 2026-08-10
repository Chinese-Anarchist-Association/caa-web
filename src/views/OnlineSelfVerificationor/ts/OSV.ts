import {type Ref, ref} from "vue";
import {decryptString, encryptString} from "@/utils/cryptoString.ts";
import {getFormatTimeWithTimezone} from "@/utils/date_timezone.ts";

export default function (){
    type DataType={
        date: string,
        extra:string,
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

        const content:string=JSON.stringify({
            date: new Date().toISOString(),
            extra: encExtraCt.value,
        });
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
            const content: DataType = JSON.parse(decryptString(ipt, pw));
            decOutputContent.value =
                `解密成功：\r\n时间：${getFormatTimeWithTimezone(content.date)}${(content.extra != '') ? `\r\n附加内容：${content.extra}` : ''}`;
        }catch{
            decOutputContent.value = '解密失败，可能密文或密钥错误';
        }
    }
    //endregion

    return{
        encPw,encExtraCt,encBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
        decPw,decInput,decOutputContent,decCopyBtn_click,
    }
}