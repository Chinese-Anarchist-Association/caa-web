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
          <div class="col-6 d-flex justify-content-center align-items-center">
            <img class="illustration w-50" alt="caa-logo" loading="lazy" src="@/assets/img/logo/caa.jpg"/>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center">
            <span class="general-text">中国无政府主义者总会<em>（Chinese Anarchist Association，CAA）</em>是一个以特定主义<em>（Especifismo）</em>为组织基础的无政府主义组织。</span>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-a">
      <div class="container">
        <div class="row">
          <div class="col-6 justify-content-center align-items-center">
            <div>
              <span class="general-text">我们致力于无政府主义<strong>理论研究</strong>、<strong>历史资料整理</strong>、<strong>文献翻译</strong>、<strong>思想传播</strong>以及<strong>组织建设实践</strong>。</span>
              <br/>
              <span class="general-text">CAA认为，无政府主义不仅是一种社会理想，也是一种需要通过理论学习、集体组织和社会实践不断发展的思想传统。</span>
            </div>
          </div>
          <div class="col-6 justify-content-center align-items-center">
            <div>
              <strong class="general-text">我们重视：</strong>
              <div class="row">
                <div class="col-6">
                  <ul class="general-text">
                    <li>自由联合</li>
                    <li>平等参与</li>
                    <li>互助合作</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="general-text">
                    <li>理论建设</li>
                    <li>集体实践</li>
                    <li>基层组织的发展</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <span class="general-text">我们希望通过持续的研究、交流和实践，推动无政府主义思想的发展。</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>
<style scoped lang="scss" src="./scss/Home.scss"></style>