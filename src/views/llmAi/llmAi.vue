<script setup lang="ts">
import aiChat from "@/components/aiChat/aiChat.vue";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);
</script>

<template>
<ai-chat id="aiChat"/>
</template>

<style scoped lang="scss">
#aiChat{
  height: calc(100vh - var(--view_margin-top));
  padding: .5rem;
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "CAA人工智能"
  }
}
</i18n>