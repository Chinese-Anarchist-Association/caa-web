<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {ref, type Ref} from "vue";

loadGlobalLocale();

const view:Ref<HTMLElement|null> = ref(null);
function viewMtComput(data:number){//导航栏在获取了自身高度后将传递到这个函数。设置view的外高以避免导航栏遮挡内容
  view.value!.style.marginTop=`${data}px`;
}
</script>

<template>
  <navbar v-on:navbarHeight="viewMtComput"/>
  <div ref="view" id="view">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
</style>
