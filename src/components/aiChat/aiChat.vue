<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";

const {lt:t}=autoUseI18n();
</script>

<template>
<div id="aiChat">
  <div id="chat">
  </div>
  <div id="send">
    <input type="text" id="sendInput" />
    <input type="button" id="sendBtn" class="btn-primary" :value="t('sendBtn')">
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/aiChat.scss"/>

<i18n>
{
  "zh-CN": {
    "sendBtn": "发送"
  }
}
</i18n>