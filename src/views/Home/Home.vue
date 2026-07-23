<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";

autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});
</script>

<template>
  <section class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1>中国无政府主义协会</h1>
          <h1>Chinese Anarchist Association</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>