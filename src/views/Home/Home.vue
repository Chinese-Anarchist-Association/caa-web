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
  <div id="home">
    <section class="pt-4rem pb-2rem bg-a">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1>{{t('global.name')}}</h1>
            <h1>{{name_enus}}</h1>
            <em>{{t(`${lp}.subTitle`)}}</em>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b">
      <div class="container">
        <div class="row">
          <div class="col-6">
            图片位
          </div>
          <div class="col-6">
            文字位
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-a">
      <div class="container">
        <div class="row">
          <div class="col-6">
            文字位
          </div>
          <div class="col-6">
            文字位
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b">
      <div class="container">
        <div class="row">
          <div class="col-12"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>
<style scoped lang="scss" src="./scss/Home.scss"></style>