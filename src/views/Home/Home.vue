<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";

autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});
</script>

<template>
  <h1>{{t(`${lp}.tmp`)}}</h1>
  <p>{{t('global.title')}}</p>
  <p>{{
      (()=>{
        console.log('test go');
        return t(`${lp}.test`);
      })()
    }}</p>
</template>

<style scoped lang="scss">
</style>