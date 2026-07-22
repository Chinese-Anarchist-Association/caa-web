import {loadOtherLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {onMounted, onUnmounted} from "vue";

/**
 * 加载语言和监听语言更改并执行加载
 * @param localePrefix 语言文件前缀
 * @param loadedRun 语言加载完成后执行的函数
 */
export function autoLoadLocale(localePrefix:string,loadedRun:(()=>void)|null=null){
    async function onLocaleChange(data:{newLocale:string; /*currentLocale:string;*/}){
        await loadOtherLocale(localePrefix,data.newLocale);//语言更改前加载目标语言
    }
    onMounted(async () => {
        await loadOtherLocale(localePrefix);
        localeEvents.on('beforeLocaleChange',onLocaleChange);
        if (loadedRun)
            loadedRun();
    });
    onUnmounted(async ()=>{
        localeEvents.off('beforeLocaleChange',onLocaleChange);
    });
}