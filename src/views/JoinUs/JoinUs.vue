<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import GuidedChat from "@/components/guidedChat/guidedChat.vue";
import {onMounted, type Ref, ref} from "vue";
import type {GcCookieData, GcCookieKey} from "@/components/guidedChat/ts/gc.ts";
import useGc from "@/views/JoinUs/ts/useGc.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_JoinUs";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});

const {test}=useGc();

const guidedChat:Ref<InstanceType<typeof GuidedChat>|null> = ref(null);

onMounted(()=>{
  const gck:GcCookieKey={
    name:"joinUs_GC_v1_test2",
    path:"/JoinUs",
  }
  const gcd:GcCookieData|undefined=guidedChat.value!.getCookie(gck);
  if (gcd!=undefined)
    guidedChat.value!.initChatFlow(test,gck,gcd.cfsk,gcd.cfh);
  else
    guidedChat.value!.initChatFlow(test,gck);
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