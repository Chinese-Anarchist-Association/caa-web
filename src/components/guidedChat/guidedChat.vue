<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {onMounted} from "vue";

const {lt:t}=autoUseI18n();

onMounted(()=>{

});
</script>

<template>
<div id="guidedChat">
  <div id="chat">
  </div>
  <div id="send"></div>
</div>
</template>

<style scoped lang="scss">
#guidedChat{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto;
  grid-row-gap: 0;
  grid-template-areas:
    "g0"
    "g1";
  #chat{
    grid-area: g0;
  }
  #send{
    grid-area: g1;
  }
}
</style>

<i18n>
{
  "zh-CN": {

  }
}
</i18n>