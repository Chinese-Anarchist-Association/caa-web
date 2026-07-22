import {type Composer, createI18n, type I18n} from 'vue-i18n';
import {nextTick, type WritableComputedRef} from 'vue'
import {isDev, isProd} from "@/ts/env/packMode.ts";
import { useCookies } from '@vueuse/integrations/useCookies';

export const i18n:I18n = createI18n({
    locale: //获取用户cookie存储的语言设置，其次判断用户的浏览器语言，如果都不可用则默认使用en-US
        useCookies().get('locale') ||
        navigator.language ||
        'en-US'/*'zh-CN'*/,
    fallbackLocale: ['en-US','zh-CN'],
    messages: undefined,//留空，后续动态加载
    globalInjection: false,//禁用全局$t

    //开发环境开启警告，生产环境则关闭
    missingWarn: isDev,
    fallbackWarn: isDev,
    silentTranslationWarn: isProd,
    silentFallbackWarn: isProd,
})
export const i18nGlobal = i18n.global as Composer & {
    locale: WritableComputedRef<string>
    fallbackLocale: WritableComputedRef<string | string[]>
};

//已加载的语言键
const localeCacheKeys = new Set<string>();

/**
 * 加载语言
 * @param locale 语言名称
 * @param fileName 语言文件名，如果留空或为null，则使用locale值
 * @param isMerge 是否合并。如果为false，之前加载的语言将被抛弃，并且将跳过缓存检查强制重载并清除相关缓存
 */
export async function loadLocale(locale:string,fileName:string|null=null,isMerge:boolean=true){
    const cacheKey:string = fileName ? `${locale}::${fileName}` : locale;
    if (isMerge && localeCacheKeys.has(cacheKey)) {
        if (isDev) console.debug(`[i18n.ts] (${cacheKey})已包含缓存，跳过加载`);
        return;//如果包含缓存则直接返回
    }

    if(!fileName) fileName=locale;

    try {
        const messages = await import(
            `@/locales/${fileName}.json`
            )

        if (isMerge)
            i18n.global.mergeLocaleMessage(locale, messages.default);
        else {
            await clearLocale(locale);
            i18n.global.setLocaleMessage(locale, messages.default);
        }
        localeCacheKeys.add(cacheKey);
        if (isDev) console.debug(`[i18n.ts] (${cacheKey})已加载`);
    }catch (e){
        if (isDev)
            console.warn(`[i18n.ts] (${cacheKey})加载失败：`,e);
    }

    return nextTick();
}

/**
 * 清空已加载的语言
 * 该函数在大部分场合下不生效，暂未查明原因。特征：执行清除后还能通过被清除的语言键显示对应语言。缓存键清除功能仍然正常。
 * 不标记为弃用，但不要为了使用清除已加载的语言功能而使用该函数，仅供缓存键清除使用。
 * @param locale 语言名称
 */
export async function clearLocale(locale:string){
    i18n.global.setLocaleMessage(locale, {});
    if (isDev) console.debug(`[i18n.ts] 清除已加载的语言：${locale}`)

    await (async () => {
        //清除目标语言的缓存
        Array.from(localeCacheKeys).forEach(key => {
            if (key === locale || key.startsWith(`${locale}::`)) {
                localeCacheKeys.delete(key);
                if (isDev)
                    console.debug(`[i18n.ts] 删除缓存键：${key}`);
            }
        });
    })();

    return nextTick();
}