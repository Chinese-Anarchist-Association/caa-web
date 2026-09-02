<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import gc from "@/components/guidedChat/ts/gc.ts";

const {lt:t}=autoUseI18n();

//当前组件是否存活，在等待中判断，避免内存泄漏
let isAlive:Ref<boolean>=ref(true);

const {
  chat,send,
  start,
  initChatFlow,
  getCookie,
}=gc(
    isAlive,
    [
      t('txt-0'),
      t('txt-1'),
      t('txt-3'),
      t('txt-4'),
      t('txt-2'),
      t('txt-5'),
      t('txt-6'),
      t('txt-7'),
      t('txt-8'),
    ],
);
void chat;
void send;

onMounted(()=>{
  if (isClient){
    start();
  }
});

onUnmounted(()=>{
  //卸载时关闭存活，以停止所有等待循环
  isAlive.value=false;
});

defineExpose({
  initChatFlow,
  getCookie,
});
</script>

<template>
<div id="guidedChat">
  <div id="chat" ref="chat">
    <!--<div class="chat-content sys">{{t('txt-0')}}</div>
    <div class="chat-content sys">{{t('txt-1')}}</div>-->
  </div>
  <div id="send" ref="send">
    <!--<div class="send-content">test</div>
    <div class="send-content">test2</div>-->
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/gc.scss"/>

<i18n>
{
  "zh-CN": {
    "txt-0": "欢迎使用CAA引导式交流终端。",
    "txt-1": "我们的通信将全程匿名，不会上传你的任何信息。",
    "txt-2": "开始通信",
    "txt-3": "正在加载...",
    "txt-4": "加载完毕。",
    "txt-5": "已发现历史通信记录。",
    "txt-6": "点击底部按钮即开始通信。",
    "txt-7": "通信会话已建立。",
    "txt-8": "通信会话已销毁。"
  }
}
</i18n>