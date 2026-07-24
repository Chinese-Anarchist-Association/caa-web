<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_JoinUs";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});
</script>

<template>
<div id="joinUs">
  <div class="container pt-6">
    <div class="row">
      <div class="col-12 text-center">
        <span class="fs-big-0">{{t(`${lp}.txt-0`)}}</span>
        <a href="xmpp:caa@conference.conversations.im?join" class="fs-big-0">caa@conference.conversations.im</a>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.fs-big-0{
  font-size: 1.5rem;
}
</style>