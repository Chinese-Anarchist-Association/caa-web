<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_JoinUs";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});
</script>

<template>
<div id="joinUs">
  <div class="container pt-4">
    <div class="row">
      <div class="col-12 col-md-6">
        <span>
          {{t(`${lp}.txt-11`)}}
        </span>
      </div>
      <div class="col-12 col-md-6">
        <span>
          {{t(`${lp}.txt-12`)}}
        </span>
      </div>
      <div class="col-12 pt-6 text-center">
        <span class="fs-big-0">{{t(`${lp}.txt-0`)}}</span>
        <a href="xmpp:caa@conference.conversations.im?join" class="fs-big-0 wrap-break-word">caa@conference.conversations.im</a>
      </div>
      <div class="col-12 text-center mt-6">
        <p><strong>{{t(`${lp}.txt-1`)}}</strong></p>
        <p>{{t(`${lp}.txt-2`)}}</p>
        <p>{{t(`${lp}.txt-3`)}}</p>
        <p>{{t(`${lp}.txt-4`)}}</p>
        <p>{{t(`${lp}.txt-5`)}}</p>
        <p>{{t(`${lp}.txt-6`)}}</p>
        <p>{{t(`${lp}.txt-7`)}}</p>
        <p>{{t(`${lp}.txt-8`)}}</p>
        <p>{{t(`${lp}.txt-9`)}}</p>
        <p><strong>{{t(`${lp}.txt-10`)}}</strong></p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.fs-big-0{
  font-size: 1.5rem;
}
.wrap-break-word{
  overflow-wrap: break-word
}
</style>