<script setup lang="ts">
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import {onMounted} from "vue";

onMounted(async ()=>{
  const engine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f32_1-MLC", {
    initProgressCallback: (progress) => {
      console.log("模型加载进度：", progress.text);
    },
  });

  const messages = [
    { role: "system", content: "你是一个有用的AI助手。" },
    { role: "user", content: "你好！" },
  ];

  const reply = await engine.chat.completions.create({ messages } as any);
  console.log(reply.choices[0]!.message.content);
  console.log(reply.usage);
});
</script>

<template>

</template>

<style scoped lang="scss">

</style>