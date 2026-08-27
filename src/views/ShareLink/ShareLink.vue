<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";

const curLH:Ref<string>=ref('');
onMounted(()=>{
  if (isClient){
    curLH.value= window.history.state?.curLH;
  }
});
</script>

<template>
<p>{{curLH}}</p>
</template>

<style scoped lang="scss">

</style>