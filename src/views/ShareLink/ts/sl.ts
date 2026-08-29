import {ref, type Ref} from "vue";
import dayjs, {Dayjs} from "dayjs";
import utc from "dayjs/plugin/utc";
import {encryptWordArray, WordArrayToHex} from "@/utils/cryptoWordArray.ts";
import sharelinkPw from '@/json/sharelinkPw.json';
import {hexToBase62} from "@/utils/base62.ts";
import type { ShareLinkPassCode } from "./sl.type";

dayjs.extend(utc);

export default function (){
    const expirationDate:Ref<string>=ref('');
    const url:Ref<string>=ref('');
    const output:Ref<string>=ref('');
    const outputSuccess:Ref<boolean>=ref(false);

    function doWork(){
        //console.log(dayjs.utc(new Date(expirationDate.value)).toISOString());
        const targetDate:Dayjs=dayjs.utc(new Date(expirationDate.value));
        if (targetDate.isAfter(dayjs.utc(new Date()))){
            const slpc:ShareLinkPassCode={
                ed: targetDate.toISOString(),
            };
            const encStr = hexToBase62(WordArrayToHex(encryptWordArray(JSON.stringify(slpc),sharelinkPw.value)));
            const u = new URL(url.value);
            u.searchParams.set('slpc', encStr);

            output.value = u.toString();
            outputSuccess.value=true;
        }else{
            outputSuccess.value=false;
            output.value="生成失败，有效期不能比当前时间更早";
        }
    }

    return {
        expirationDate,url,
        doWork,
        output,outputSuccess,
    }
}