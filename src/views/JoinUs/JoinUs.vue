<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_JoinUs";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});
</script>

<template>
<div id="joinUs">
  <guided-chat id="guidedChat"></guided-chat>
</div>
</template>

<style scoped lang="scss">
#guidedChat{
  height: calc(100vh - var(--view_margin-top));
}
</style>