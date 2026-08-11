<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import OSV from "@/views/OnlineSelfVerificationor/ts/OSV.ts";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

const {
  encPw,encExtraCt,encBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
  decPw,decInput,decOutputContent,decCopyBtn_click,
}=OSV();
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('getEnc')}}</h2>
    </div>
    <!--<div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('time')}}</label>
        <input type="text" class="form-control" disabled/>
      </div>
    </div>-->
    <div class="col-12">
      <div class="input-group">
        <label class="input-group-text">{{t('extraContent')}}</label>
        <textarea type="text" v-model="encExtraCt" class="form-control" :placeholder="t('extraContent_placeholder')"></textarea>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input type="text" v-model="encPw" class="form-control"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="encBtn_click">{{t('encButton')}}</button>
    </div>
    <div class="col-12 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('output')}}</label>
        <textarea type="text" class="form-control" v-model="encOutputContent" disabled></textarea>
        <button class="btn btn-primary btn-outline-secondary" v-if="encCopyBtn_show" @click="encCopyBtn_click">
          <svg class="bi" width="16" height="16"><use xlink:href="#svg-bsi-copy"></use></svg>
        </button>
      </div>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('getDec')}}</h2>
    </div>
    <!--<div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('time')}}</label>
        <input type="text" class="form-control" disabled/>
      </div>
    </div>-->
    <div class="col-12">
      <div class="input-group">
        <label class="input-group-text">{{t('decInput')}}</label>
        <textarea v-model="decInput" type="text" class="form-control" :placeholder="t('decInput_placeholder')"></textarea>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input v-model="decPw" type="text" class="form-control"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="decCopyBtn_click">{{t('decButton')}}</button>
    </div>
    <div class="col-12 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('output')}}</label>
        <textarea v-model="decOutputContent" type="text" class="form-control" disabled></textarea>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
</style>

<i18n>
{
  "zh-CN": {
    "title": "网络身份验证器",
    "getEnc": "获取密文",
    "time": "时间",
    "password": "密码",
    "extraContent": "附加内容",
    "extraContent_placeholder": "添加至密文中的附加内容，可选",
    "encButton": "执行加密",
    "output": "输出",
    "getDec": "获取明文",
    "decButton": "执行解密",
    "decInput": "密文",
    "decInput_placeholder": "在此输入密文"
  }
}
</i18n>