<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import aos from "@/plugins/aos.ts";
import imgLoad from "@/views/Home/ts/imgLoad.ts";
import weAreUnited from "@/views/Home/ts/weAreUnited.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";

autoLoadLocale(lp,()=>{
  useTitle(t(`global.name`));
});

aos();

const {imgsUrl} = imgLoad();

const {
  weAreUnitedContainer
}=weAreUnited();
</script>

<template>
  <div id="home">
    <section id="firstSection">
      <canvas id="weAreUnited_container" ref="weAreUnitedContainer"></canvas>
      <div id="firstSection_title">
        <h1>{{t('global.name')}}</h1>
        <p>{{t(`${lp}.subTitle`)}}</p>
      </div>
    </section>

    <section class="pt-4rem pb-2rem bg-a">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="fs-big-0" data-aos="fade-down" data-aos-delay="300">{{t('global.name')}}</h1>
            <em data-aos="fade-up" data-aos-delay="500">{{t(`${lp}.subTitle`)}}</em>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img class="illustration w-50 bg_only-light-show have-padding" alt="caa-logo" loading="lazy" :src="imgsUrl[0]" data-aos="flip-up" data-aos-delay="700"/>
          </div>
          <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <span class="general-text" data-aos="zoom-in" data-aos-delay="900">{{t(`${lp}.txt-0-0`)}}<em>{{t(`${lp}.txt-0-1`)}}</em>{{t(`${lp}.txt-0-2`)}}<em>{{t(`${lp}.txt-0-3`)}}</em>{{t(`${lp}.txt-0-4`)}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-a">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 justify-content-center align-items-center">
            <div>
              <span class="general-text" data-aos="zoom-in-right">{{t(`${lp}.txt-1-0`)}}<strong>{{t(`${lp}.txt-1-1`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-3`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-4`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-5`)}}</strong>{{t(`${lp}.txt-1-6`)}}<strong>{{t(`${lp}.txt-1-7`)}}</strong>{{t(`${lp}.txt-1-8`)}}</span>
              <br/>
              <span class="general-text" data-aos="zoom-in-right" data-aos-delay="400">{{t(`${lp}.txt-2`)}}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 justify-content-center align-items-center">
            <div>
              <strong class="general-text" data-aos="zoom-in-left" data-aos-delay="600">{{t(`${lp}.txt-3`)}}</strong>
              <div class="row">
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up" data-aos-delay="800">
                    <li>{{t(`${lp}.txt-4`)}}</li>
                    <li>{{t(`${lp}.txt-5`)}}</li>
                    <li>{{t(`${lp}.txt-6`)}}</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up" data-aos-delay="800">
                    <li>{{t(`${lp}.txt-7`)}}</li>
                    <li>{{t(`${lp}.txt-8`)}}</li>
                    <li>{{t(`${lp}.txt-9`)}}</li>
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
            <span class="general-text" data-aos="zoom-out">{{t(`${lp}.txt-10`)}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-6 pb-6 bg-a">
      <!--用于占位-->
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>
<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/weAreUnited.scss"></style>

<style scoped lang="css" src="aos/dist/aos.css"></style>