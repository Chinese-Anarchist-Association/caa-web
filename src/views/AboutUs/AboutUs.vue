<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_AboutUs";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});
</script>

<template>
<div id="aboutUs">
  <div class="container pt-3">
    <div class="row">
      <div class="col-12 text-center">
        <h2>{{t(`${lp}.title`)}}</h2>
      </div>
      <div class="col-12">
        <h4>组织介绍</h4>
        <p>中国无政府主义者总会（CAA）是一个基于特定主义传统建立的无政府主义组织。</p>
        <p>特定主义强调建立具有明确理论基础和实践目标的无政府主义组织，通过集体讨论、组织建设和社会联系，使无政府主义者能够以更持续、更有效的方式参与社会实践。</p>
        <p>CAA关注中国社会现实，同时吸收国际无政府主义运动的历史经验和理论成果。</p>
        <span>我们的主要工作包括：</span>
        <ul>
          <li>无政府主义理论研究</li>
          <li>历史文献整理</li>
          <li>外文资料翻译</li>
          <li>理论传播</li>
          <li>组织建设探索</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>