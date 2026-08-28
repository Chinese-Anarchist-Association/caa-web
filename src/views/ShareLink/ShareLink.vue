<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import Sl from "@/views/ShareLink/ts/sl.ts";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

const {expirationDate}=Sl();
const curLH:Ref<string>=ref('');

onMounted(()=>{
  if (isClient){
    curLH.value= window.history.state?.curLH;

    //expirationDate.value="2026-08-28T13:00:52"
  }
});


</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('title')}}</h2>
    </div>
    <div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('expirationDate')}}</label>
        <input class="form-control" type="datetime-local" step="1" v-model="expirationDate"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 mt-lg-0 d-flex justify-content-center">
        <button class="btn btn-primary">{{t('doWork')}}</button>
    </div>
    <div class="col-12 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('output')}}</label>
        <input class="form-control" type="text" disabled/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>

<i18n lang="yaml">
"zh-CN":
  "title": "分享链接"
  "expirationDate": "有效期至"
  "doWork": "生成链接"
  "output": "链接"
</i18n>