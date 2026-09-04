<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import aos from "@/plugins/aos.ts";
import imgLoad from "@/views/Home/ts/imgLoad.ts";
import weAreUnited from "@/views/Home/ts/weAreUnited.ts";
import easterEgg_init from './ts/easterEgg';

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
void weAreUnitedContainer;//消除构建报错TS6133

const {easterEgg,easterEgg_click,isReady:ee_isReady,}=easterEgg_init();
void easterEgg;
</script>

<template>
  <div id="home">
    <section id="firstSection">
      <img alt="CAA" id="weAreUnited_bgImg" :src="imgsUrl[1]"/>
      <canvas id="weAreUnited_container" ref="weAreUnitedContainer"></canvas>
      <div id="firstSection_title">
        <h1 data-aos="fade-down" data-aos-offset="0" data-aos-delay="300">{{t(`${lp}.txt-0-0`)}}</h1>
        <p data-aos="fade-up" data-aos-offset="0" data-aos-delay="500">{{t(`${lp}.subTitle`)}}</p>
      </div>
      <div id="easterEgg" ref="easterEgg" @click="easterEgg_click" @contextmenu.prevent="easterEgg_click"
           :class="{'notReady':(!ee_isReady),'isReady':(ee_isReady)}"
      >
        <svg-a-anarchy class="svgObj"/>
        <router-link :to="{name:'aParty'}" class="ee-link" v-if="ee_isReady"/>
      </div>
    </section>

    <section class="pt-2rem pb-2rem bg-a overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <img class="illustration w-50 bg_only-light-show have-padding" alt="caa-logo" loading="lazy" :src="imgsUrl[0]" data-aos="flip-up"/>
          </div>
          <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div data-aos="zoom-in">
              <span class="general-text" >{{t(`${lp}.txt-0-0`)}}<em>{{t(`${lp}.txt-0-1`)}}</em>{{t(`${lp}.txt-0-2`)}}<em>{{t(`${lp}.txt-0-3`)}}</em>{{t(`${lp}.txt-0-4`)}}</span>
              <br/>
              <span class="general-text">{{t(`${lp}.txt-10`)}}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-2 d-flex justify-content-center align-items-center">
            <div>
              <span class="general-text" data-aos="zoom-in-right">{{t(`${lp}.txt-1-0`)}}<strong>{{t(`${lp}.txt-1-1`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-3`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-4`)}}</strong>{{t(`${lp}.txt-1-2`)}}<strong>{{t(`${lp}.txt-1-5`)}}</strong>{{t(`${lp}.txt-1-6`)}}<strong>{{t(`${lp}.txt-1-7`)}}</strong>{{t(`${lp}.txt-1-8`)}}</span>
              <br/>
              <span class="general-text" data-aos="zoom-in-right">{{t(`${lp}.txt-2`)}}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-2 d-flex justify-content-center align-items-center">
            <div>
              <span class="general-text" data-aos="zoom-in-right">{{t(`${lp}.txt-12`)}}</span>
              <br/>
              <span class="general-text" data-aos="zoom-in-right">{{t(`${lp}.txt-13`)}}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-2 d-flex justify-content-center">
            <div>
              <strong class="general-text" data-aos="zoom-in-left">{{t(`${lp}.txt-3`)}}</strong>
              <div class="row">
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up">
                    <li>{{t(`${lp}.txt-4`)}}</li>
                    <li>{{t(`${lp}.txt-5`)}}</li>
                    <li>{{t(`${lp}.txt-6`)}}</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up">
                    <li>{{t(`${lp}.txt-7`)}}</li>
                    <li>{{t(`${lp}.txt-8`)}}</li>
                    <li>{{t(`${lp}.txt-9`)}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-2 d-flex justify-content-center">
            <div>
              <strong class="general-text" data-aos="zoom-in-left">{{t(`${lp}.txt-14`)}}</strong>
              <div class="row">
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up">
                    <li>{{t(`${lp}.txt-15`)}}</li>
                    <li>{{t(`${lp}.txt-16`)}}</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="general-text" data-aos="zoom-in-up">
                    <li>{{t(`${lp}.txt-17`)}}</li>
                    <li>{{t(`${lp}.txt-18`)}}</li>
                    <li>{{t(`${lp}.txt-19`)}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 data-aos="fade-down">{{t(`${lp}.txt-20`)}}</h2>
          </div>
          <div class="col-12">
            <p data-aos="zoom-in">{{t(`${lp}.txt-21`)}}</p>
          </div>
          <div class="col-6 col-md-3 mt-1">
            <div class="card h-100" data-aos="fade-right">
              <div class="card-header">
                <strong>{{t(`${lp}.txt-22`)}}</strong>
              </div>
              <div class="card-body">
                <span>{{t(`${lp}.txt-23`)}}</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 mt-1">
            <div class="card h-100" data-aos="fade-left">
              <div class="card-header">
                <strong>{{t(`${lp}.txt-24`)}}</strong>
              </div>
              <div class="card-body">
                <span>{{t(`${lp}.txt-25`)}}</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 mt-1">
            <div class="card h-100" data-aos="fade-right">
              <div class="card-header">
                <strong>{{t(`${lp}.txt-26`)}}</strong>
              </div>
              <div class="card-body">
                <span>{{t(`${lp}.txt-27`)}}</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3 mt-1">
            <div class="card h-100" data-aos="fade-left">
              <div class="card-header">
                <strong>{{t(`${lp}.txt-28`)}}</strong>
              </div>
              <div class="card-body">
                <span>{{t(`${lp}.txt-29`)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-a overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 data-aos="fade-down">{{t(`${lp}.txt-11`)}}</h2>
          </div>
          <div class="col-12 col-md-6 col-lg-3 mt-2" v-for="(imgUrl,index) in imgsUrl.slice(2,6)">
            <div class="card" data-aos="flip-up" :data-aos-delay="(index%2==0)?0:200">
              <img class="card-img" alt="photo" loading="lazy" :src="imgUrl"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-b overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <router-link class="btn btn-primary w-100 h-100 d-flex justify-content-center align-items-center" :to="{name: 'areYouAnarchist'}" data-aos="fade-right">
              {{t(`${lp}.txt-30`)}}
            </router-link>
          </div>
          <div class="col-6">
            <router-link class="btn btn-primary w-100 h-100 d-flex justify-content-center align-items-center" :to="{name: 'joinUs'}" data-aos="fade-left">
              {{t(`${lp}.txt-31`)}}
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-2rem pb-2rem bg-a overflow-hidden" id="aioSection">
      <div class="h-100 w-100">
        <div class="text-center">
          <span class="text-0" data-aos="zoom-in-down">无治即秩序</span><br/>
          <svg-a-punk-style-circle-a class="svgObj" data-aos="zoom-in"/><br/>
          <span class="text-1" data-aos="zoom-in-up">Anarchy Is Order</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>
<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/weAreUnited.scss"></style>
<style scoped lang="scss" src="./scss/easterEgg.scss"/>

<style scoped lang="css" src="aos/dist/aos.css"></style>
