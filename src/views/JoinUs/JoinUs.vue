<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import GuidedChat from "@/components/guidedChat/guidedChat.vue";
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import type {GcCookieData, GcCookieKey} from "@/components/guidedChat/ts/gc.ts";
import useGc from "@/views/JoinUs/ts/useGc.ts";
import {sleep} from "@/utils/sleep.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_JoinUs";

//语言数据是否加载完成
let isLocaleLoaded:boolean=false;

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);

  isLocaleLoaded=true;
});

//当前组件是否存活，在等待中判断，避免内存泄漏
let isAlive:boolean=true;
onUnmounted(()=>{
  isAlive=false;
});

const {getGcCfc}=useGc(t,`${lp}.gc`);
const guidedChat:Ref<InstanceType<typeof GuidedChat>|null> = ref(null);

onMounted(async ()=>{
  while (!isLocaleLoaded && isAlive){
    await sleep(500);
  }
  const gck:GcCookieKey={
    name:"joinUs_GC_v2",//每次更新内容后需要更改cookie键名，以避免使用过的用户的数据不匹配
    path:"/JoinUs",
  }
  const gcd:GcCookieData|undefined=guidedChat.value!.getCookie(gck);
  if (gcd!=undefined)
    guidedChat.value!.initChatFlow(getGcCfc(),gck,gcd.cfsk,gcd.cfh);
  else
    guidedChat.value!.initChatFlow(getGcCfc(),gck);
});
</script>

<template>
<div id="joinUs">
  <guided-chat id="guidedChat" ref="guidedChat"></guided-chat>
</div>
</template>

<style scoped lang="scss">
#guidedChat{
  height: calc(100vh - var(--view_margin-top));
  padding: .5rem;
}
</style>