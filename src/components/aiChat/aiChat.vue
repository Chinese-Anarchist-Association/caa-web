<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import aiChat from "@/components/aiChat/ts/aiChat.ts";
import {isClient} from "@/ts/env/ssr.ts";

const {lt:t}=autoUseI18n();

//当前组件是否存活，在等待中判断，避免内存泄漏
let isAlive:Ref<boolean>=ref(true);

const chat:Ref<HTMLDivElement|null> = ref(null);
const sendInput:Ref<HTMLInputElement|null> = ref(null);
const sendBtn:Ref<HTMLInputElement|null> = ref(null);

const{
  start,
  send,
  isDisSend,
}=aiChat(
    chat,
    isAlive,
    (()=>{
      const output:string[]=[];
      for (let i=0;i<=4;i++){
        output.push(t(`outputString.${i}`));
      }
      return output;
    })(),
);

onMounted(()=>{
  if (isClient){
    start();
  }
});

onUnmounted(()=>{
  //卸载时关闭存活，以停止所有等待循环
  isAlive.value=false;
});

function sendBtn_click(){
  if (sendInput.value && !isDisSend.value){
    send(sendInput.value.value);
    sendInput.value.value = '';
  }
}
function sendInput_keyup_enter(){
  sendBtn_click();
}
</script>

<template>
<div id="aiChat">
  <div id="chat" ref="chat">
  </div>
  <div id="send">
    <input type="text" id="sendInput" ref="sendInput" @keyup.enter="sendInput_keyup_enter"/>
    <input type="button" id="sendBtn" ref="sendBtn" @click="sendBtn_click"
           class="btn-primary" :value="t('sendBtn')" :disabled="isDisSend"/>
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/aiChat.scss"/>

<i18n>
{
  "zh-CN": {
    "sendBtn": "发送",
    "outputString": {
      "0": "欢迎使用CAA人工智能交流终端。",
      "1": "你与AI之间的交流完全匿名，不会上传至任何地方和以任何形式持久化保存。",
      "2": "发送'y'以开始下载或加载AI。注意：下载操作进行时会消耗巨额流量。",
      "3": "开始下载或加载AI。",
      "4": "AI加载失败，请尝试重试。"
    }
  }
}
</i18n>