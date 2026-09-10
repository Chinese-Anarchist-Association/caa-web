<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);
</script>

<template>
  <div id="chat">
    <iframe src="https://chitchatter.im/private/ChineseAnarchistAssociation_CHAT_Private?embed=1"
            allow="camera;microphone;display-capture;fullscreen"
            id="chat" />
  </div>
</template>

<style scoped lang="scss">
#chat{
  height: calc(100vh - var(--view_margin-top));
  width: 100%;
  overflow: hidden;
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "私人匿名安全通信"
  }
}
</i18n>