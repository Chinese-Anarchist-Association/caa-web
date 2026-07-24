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
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>