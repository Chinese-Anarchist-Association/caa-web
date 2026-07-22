import {i18nGlobal, loadLocale} from "@/plugins/i18n.ts";
import {useI18n} from "vue-i18n";
import mitt, {type Emitter} from 'mitt';
import { useCookies } from '@vueuse/integrations/useCookies'

type LocaleChangedEvent={
    //更改语言之前触发
    beforeLocaleChange:{currentLocale:string; newLocale:string};
    //更改语言之后触发
    afterLocaleChange:{currentLocale:string; oldLocale:string};
}
//本地化相关事件
export const localeEvents: Emitter<LocaleChangedEvent> = mitt<LocaleChangedEvent>();


/**
 * 切换语言，并触发语言更改事件
 * @param locale 语言名
 */
export async function switchLocale(locale: string) {
    const oldLocale:string=i18nGlobal.locale.value;
    if (oldLocale === locale) return;

    localeEvents.emit(
        'beforeLocaleChange',
        {
            currentLocale: oldLocale,
            newLocale: locale,
        }
    );
    i18nGlobal.locale.value = locale;
    localeEvents.emit(
        'afterLocaleChange',
        {
            currentLocale: locale,
            oldLocale: oldLocale,
        }
    );

    useCookies().set('locale', locale);
}

/**
 * 加载子语言文件，通常每个页面或组件可能分配一个
 * @param filePrefix 子语言文件前缀名，文件名格式：@/locales/[filePrefix].zh-CN.json、@/locales/[filePrefix].en-US.json
 * @param locale 指定加载某个或多个目标语言，默认为null。如果留空或为null，将根据前缀加载当前语言和回退语言，相反则只加载其指定的一个或多个语言
 */
export async function loadOtherLocale(filePrefix:string,locale:string|string[]|null=null){
    async function doLoad(loc:string) {
        await loadLocale(loc, `${filePrefix}.${loc}`);
    }
    if (locale==null) {
        {
            const loc: string = getCurrentLocale();
            await doLoad(loc);
        }
        {
            const backLoc: string[] = getFallbackLocale(true) as string[];
            backLoc.forEach((async (loc: string) => {
                await doLoad(loc);
            }))
        }
    }else{
        if (Array.isArray(locale)){
            locale.forEach((async (loc: string) => {
                await doLoad(loc);
            }))
        }else {
            await doLoad(locale);
        }
    }
}

/**
 * 加载全局语言
 */
export async function loadGlobalLocale(){
    await loadLocale(i18nGlobal.locale.value);
    const backLoc:string[] = i18nGlobal.fallbackLocale.value as string[];
    if (backLoc) {
        backLoc.forEach((l: string) => {
            loadLocale(l);
        })
    }
}

export function autoUseI18n(){
    const { t:gt } = useI18n({//访问全局语言
        inheritLocale: true,
        useScope: 'global'
    })
    const { t:lt } = useI18n({//仅供访问嵌入式语言
        inheritLocale: true,
        useScope: 'local'
    })
    return {gt, lt};
}

/**
 * 获取当前使用的语言名，例：zh-CN、en-US
 */
export function getCurrentLocale():string{
    return i18nGlobal.locale.value;
}

/**
 * 获取回退语言
 * @param forceArray 强制返回string[]类型，默认为false
 */
export function getFallbackLocale(forceArray:boolean=false):string|string[]{
    if (forceArray){
        const fblv:string|string[]=i18nGlobal.fallbackLocale.value;
        if (Array.isArray(fblv))
            return fblv;
        else
            return [fblv];
    }else return i18nGlobal.fallbackLocale.value;
}