<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {gt}=autoUseI18n();
const lp:string="view_Home";
useTitle(gt('global.title'));

autoLoadLocale(lp);//使用一体化自动加载语言
</script>

<template>
  <h1>{{gt(`${lp}.tmp`)}}</h1>
  <p>{{gt('global.title')}}</p>
</template>

<style scoped lang="scss">
</style>