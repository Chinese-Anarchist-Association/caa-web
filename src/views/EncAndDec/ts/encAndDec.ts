import {type Ref, ref} from 'vue';
import { encryptUint8Array, decryptUint8Array } from '@/utils/crypto.ts';
import defPw from '@/json/defPw.json';

//加密
export function ENC() {
    const encPassword = ref('');
    //当前是否可以开始执行加密
    const canDoEnc:Ref<boolean>=ref(false);
    //当前是否加密失败
    const isEncError:Ref<boolean>=ref(false);
    let encFileData: Uint8Array | null = null;
    let encFileName: string = '';

    function handleEncFile(event: Event) {
        const elem = event.target as HTMLInputElement;
        const file = elem.files?.[0];
        if (!file) return;
        encFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            const buffer = e.target?.result as ArrayBuffer;
            encFileData = new Uint8Array(buffer);
        };
        reader.readAsArrayBuffer(file);
        canDoEnc.value=true;
    }

    function encBtn_click() {
        isEncError.value=false;
        if (!encFileData) {
            isEncError.value=true;
            return;
        }
        const password = encPassword.value.trim() || defPw.value;
        try {
            const encryptedBase64 = encryptUint8Array(encFileData, password);
            const url = URL.createObjectURL(
                //将base64结果保存为文本文件
                new Blob([encryptedBase64], {type: 'text/plain;charset=utf-8'})
            );
            //创建临时a元素触发下载
            const a = document.createElement('a');
            a.href = url;
            a.download = `${encFileName}.enc`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);//释放
        } catch /*(err)*/ {
            //alert('加密失败：' + (err as Error).message);
            isEncError.value=true;
        }
    }

    return {
        encPassword,handleEncFile,encBtn_click,canDoEnc,isEncError,
    };
}

//解密
export function DEC() {
    const decPassword = ref('');
    //当前是否可以开始执行解密
    const canDoDec:Ref<boolean>=ref(false);
    //当前是否解密失败
    const isDecError:Ref<boolean>=ref(false);
    let decFileData: string | null = null;
    let decFileName: string = '';

    function handleDecFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        decFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            decFileData = e.target?.result as string;
        };
        reader.readAsText(file, 'utf-8');
        canDoDec.value=true;
    }

    function decBtn_click() {
        isDecError.value=false;
        if (!decFileData) {
            isDecError.value=true;
            return;
        }
        const password = decPassword.value.trim() || defPw.value;
        try {
            const decryptedData = decryptUint8Array(decFileData, password);
            const url = URL.createObjectURL(
                //保存为原始文件
                new Blob([decryptedData as BlobPart])
            );
            //临时创建触发下载
            const a = document.createElement('a');
            a.href = url;
            a.download = (() => {
                const tg = '.enc';
                if (decFileName.endsWith(tg))
                    return decFileName.slice(0, -tg.length);
                else
                    return decFileName;
            })();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);//释放
        } catch /*(err)*/ {
            //alert('解密失败：' + (err as Error).message);
            isDecError.value=true;
        }
    }

    return {
        decPassword,handleDecFile,decBtn_click,canDoDec,isDecError,
    };
}