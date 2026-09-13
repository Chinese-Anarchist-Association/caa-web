<script setup lang="ts">
import aiChat from "@/components/aiChat/aiChat.vue";
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