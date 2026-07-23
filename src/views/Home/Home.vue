<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {name_enus} from "@/ts/env/stringEnv.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";

autoLoadLocale(lp,()=>{
  useTitle(t(`global.name`));
});
</script>

<template>
  <section class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1>{{t(`global.name`)}}</h1>
          <h1>{{name_enus}}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>