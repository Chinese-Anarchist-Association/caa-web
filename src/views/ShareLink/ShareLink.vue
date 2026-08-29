<script setup lang="ts">
import {onMounted} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import Sl from "@/views/ShareLink/ts/sl.ts";
import dayjs from "dayjs";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

const {expirationDate,url:curUrl,doWork,output,outputSuccess,}=Sl();

onMounted(()=>{
  if (isClient){
    curUrl.value= window.history.state?.curLH ?? window.location.origin;
    expirationDate.value=dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss");//获取当前本地时间
    //expirationDate.value="2026-08-28T13:00:52"
    //console.log(curUrl.value)
  }
});

async function copyBtn_click(){
  await navigator.clipboard.writeText(output.value);
}
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center mb-3">
      <h2>{{t('title')}}</h2>
      <em>{{t('explain')}}</em>
    </div>
    <div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('expirationDate')}}</label>
        <input class="form-control" type="datetime-local" step="1" v-model="expirationDate"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 mt-lg-0 d-flex justify-content-center">
        <button class="btn btn-primary" @click="doWork">{{t('doWork')}}</button>
    </div>
    <div class="col-12 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('output')}}</label>
        <input class="form-control" type="text" v-model="output" disabled/>
        <button class="btn btn-primary btn-outline-secondary" v-if="outputSuccess" @click="copyBtn_click">
          <svg-bsi-copy class="bi" width="16" height="16"></svg-bsi-copy>
        </button>
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
  "explain": "生成一个链接，在有效期内访问可以直接绕过皮套页面。即可不需要做谜题直接解锁，适用于分享。"
</i18n>