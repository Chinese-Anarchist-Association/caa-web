<script setup lang="ts">
import {DEC, ENC} from "@/views/EncAndDec/ts/encAndDec.ts";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import textEncAndDec from "@/views/EncAndDec/ts/textEncAndDec.ts";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

const {encPassword,handleEncFile,encBtn_click,canDoEnc,isEncError}=ENC();
const {decPassword,handleDecFile,decBtn_click,canDoDec,isDecError}=DEC();

const {
  encPw,encContent,encTextBtn_click,encOutputContent,encCopyBtn_show,encCopyBtn_click,
  decPw,decInput,decOutputContent,decTextBtn_click,
}=textEncAndDec();
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('encTitle')}}</h2>
    </div>
    <div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('inputFileEnc')}}</label>
        <input type="file" class="form-control" @change="handleEncFile" />
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 mt-lg-0">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input v-model="encPassword" :placeholder="t('pwPlaceholder')" type="password" class="form-control" />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mt-2">
      <button @click="encBtn_click" class="btn btn-primary" :disabled="!canDoEnc">{{t('encButton')}}</button>
    </div>
    <div v-if="isEncError" class="col-12 text-center mt-2">
      <strong class="error-text">{{t('encError')}}</strong>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('decTitle')}}</h2>
    </div>
    <div class="col-12 col-lg-6">
      <div class="input-group">
        <label class="input-group-text">{{t('inputFileDec')}}</label>
        <input class="form-control" type="file" @change="handleDecFile" accept=".enc,text/plain" />
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 mt-lg-0">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input v-model="decPassword" :placeholder="t('pwPlaceholder')" type="password" class="form-control" />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mt-2">
      <button @click="decBtn_click" class="btn btn-primary" :disabled="!canDoDec">{{t('decButton')}}</button>
    </div>
    <div v-if="isDecError" class="col-12 text-center mt-2">
      <strong class="error-text">{{t('decError')}}</strong>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('encTextTitle')}}</h2>
    </div>
    <div class="col-12">
      <div class="input-group">
        <label class="input-group-text">{{t('encContent')}}</label>
        <textarea type="text" v-model="encContent" class="form-control"></textarea>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input type="password" v-model="encPw" :placeholder="t('pwPlaceholder')" class="form-control"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="encTextBtn_click">{{t('encTextButton')}}</button>
    </div>
    <div class="col-12 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('output')}}</label>
        <textarea type="text" class="form-control" v-model="encOutputContent" disabled></textarea>
        <button class="btn btn-primary btn-outline-secondary" v-if="encCopyBtn_show" @click="encCopyBtn_click">
          <svg-bsi-copy class="bi" width="16" height="16"></svg-bsi-copy>
        </button>
      </div>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('decTextTitle')}}</h2>
    </div>
    <div class="col-12">
      <div class="input-group">
        <label class="input-group-text">{{t('decContent')}}</label>
        <textarea v-model="decInput" type="text" class="form-control"></textarea>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2">
      <div class="input-group">
        <label class="input-group-text">{{t('password')}}</label>
        <input v-model="decPw" type="password" :placeholder="t('pwPlaceholder')" class="form-control"/>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-2 d-flex justify-content-center">
      <button class="btn btn-primary" @click="decTextBtn_click">{{t('decTextButton')}}</button>
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
.error-text{
  color: red;
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "加解密工具",
    "encTitle": "文件加密",
    "decTitle": "文件解密",
    "inputFileEnc": "选择待加密文件：",
    "inputFileDec": "选择待解密文件：",
    "password": "密码：",
    "pwPlaceholder": "留空将使用默认密码",
    "encButton": "加密并下载",
    "decButton": "解密并下载",
    "encError": "加密失败",
    "decError": "解密失败",
    "encTextTitle": "文本加密",
    "decTextTitle": "文本解密",
    "encContent": "待加密内容",
    "decContent": "待解密内容",
    "encTextButton": "执行文本加密",
    "decTextButton": "执行文本解密",
    "output": "输出"
  }
}
</i18n>