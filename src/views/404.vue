<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);
</script>

<template>
  <h1>404 - {{t('title')}}</h1>
  <router-link :to="{name: 'home'}">{{t('txt-0')}}</router-link>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "title": "未找到页面",
    "txt-0": "返回主页"
  },
  "en-US": {
    "title": "Not Found",
    "txt-0": "Back to Home"
  }
}
</i18n>