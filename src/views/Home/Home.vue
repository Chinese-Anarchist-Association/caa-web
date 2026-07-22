<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";
useTitle(t('global.title'));

autoLoadLocale(lp);//使用一体化自动加载语言
</script>

<template>
  <h1>{{t(`${lp}.tmp`)}}</h1>
  <p>{{t('global.title')}}</p>
  <p>{{t(`${lp}.test`)}}</p>
</template>

<style scoped lang="scss">
</style>