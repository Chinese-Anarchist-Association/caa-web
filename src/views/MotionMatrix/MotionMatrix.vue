<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import Content from "@/views/MotionMatrix/ts/content.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_MotionMatrix";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});

const {content}=Content();
void content;
</script>

<template>
<div id="motionMatrix">
  <div class="container pt-3">
    <div class="row">
      <div class="col-12 text-center">
        <h2>{{t(`${lp}.pageTitle`)}}</h2>
      </div>
      <div class="col-12" v-html="content"></div>
      <!--
      <div class="col-12">
        <strong>{{t(`${lp}.txt-0`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-1`)}}</span>
            <a class="wrap-break-word" href="https://chinese-anarchist-association.github.io/caa-web/">https://chinese-anarchist-association.github.io/caa-web/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-2`)}}</span>
            <a class="wrap-break-word" href="https://organize.crd.co/#china">https://organize.crd.co/#china</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-3`)}}</span>
            <a class="wrap-break-word" href="https://www.instagram.com/chineseanarchistassociation?igsh=MWJpc3c5MW8wb2gw">https://www.instagram.com/chineseanarchistassociation?igsh=MWJpc3c5MW8wb2gw</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-4`)}}</span>
            <a class="wrap-break-word" href="https://www.threads.com/@chineseanarchistassociation">https://www.threads.com/@chineseanarchistassociation</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-5`)}}</span>
            <a class="wrap-break-word" href="https://www.facebook.com/share/1BJyFNV3Pe/">https://www.facebook.com/share/1BJyFNV3Pe/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-6`)}}</span>
            <a class="wrap-break-word" href="https://x.com/Gyroject_X">https://x.com/Gyroject_X</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-7`)}}</span>
            <a class="wrap-break-word" href="https://matrix.to/#/%23chineseanarchistassociation:matrix.org">https://matrix.to/#/%23chineseanarchistassociation:matrix.org</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-8`)}}</span>
            <a class="wrap-break-word" href="https://github.com/Chinese-Anarchist-Association">https://github.com/Chinese-Anarchist-Association</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-9`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-10`)}}</span>
            <a class="wrap-break-word" href="https://b23.tv/C6Getom">https://b23.tv/C6Getom</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-11`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-10`)}}</span>
            <a class="wrap-break-word" href="https://b23.tv/7PKgfwK">https://b23.tv/7PKgfwK</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-12`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-10`)}}</span>
            <a class="wrap-break-word" href="https://b23.tv/yx4Kxor">https://b23.tv/yx4Kxor</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-1`)}}</span>
            <a class="wrap-break-word" href="https://www.aworld.wiki/#/mobile/recommended-reading">https://www.aworld.wiki/#/mobile/recommended-reading</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-13`)}}</span>
            <a class="wrap-break-word" href="https://x.com/CyberAnarc2824">https://x.com/CyberAnarc2824</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-14`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-10`)}}</span>
            <a class="wrap-break-word" href="https://b23.tv/ONs8ghz">https://b23.tv/ONs8ghz</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-15`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-10`)}}</span>
            <a class="wrap-break-word" href="https://b23.tv/g9zCNNs">https://b23.tv/g9zCNNs</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-16`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-1`)}}</span>
            <a class="wrap-break-word" href="https://zh.anarchistlibraries.net/special/index">https://zh.anarchistlibraries.net/special/index</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-17`)}}</span>
            <a class="wrap-break-word" href="mailto:zhanarchistlibrary@protonmail.com">zhanarchistlibrary@protonmail.com</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-7`)}}</span>
            <a class="wrap-break-word" href="https://matrix.to/#/%23ChineseAnarchistLibrary:riot.anarchyplanet.org">https://matrix.to/#/%23ChineseAnarchistLibrary:riot.anarchyplanet.org</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-18`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-1`)}}</span>
            <a class="wrap-break-word" href="https://www.iyouport.org/">https://www.iyouport.org/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-19`)}}</span>
            <a class="wrap-break-word" href="https://iyouport.notion.site">https://iyouport.notion.site</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-20`)}}</span>
            <a class="wrap-break-word" href="https://x.com/iyouport_news">https://x.com/iyouport_news</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-21`)}}</span>
            <a class="wrap-break-word" href="https://iyouport.substack.com/">https://iyouport.substack.com/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-22`)}}</span>
            <a class="wrap-break-word" href="https://t.me/s/iyouport?before=6081">https://t.me/s/iyouport?before=6081</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-23`)}}</span>
            <a class="wrap-break-word" href="https://www.patreon.com/iyouport">https://www.patreon.com/iyouport</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-24`)}}</span>
            <a class="wrap-break-word" href="https://steemit.com/@iyouport">https://steemit.com/@iyouport</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-25`)}}</span>
            <a class="wrap-break-word" href="https://medium.com/@iyouport">https://medium.com/@iyouport</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-8`)}}</span>
            <a class="wrap-break-word" href="https://nodebe4.github.io/oped2/categories/#iYouPort">https://nodebe4.github.io/oped2/categories/#iYouPort</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-26`)}}</span>
            <a class="wrap-break-word" href="https://storage.googleapis.com/qurium/iyouport.org/category-opinion-1.html">https://storage.googleapis.com/qurium/iyouport.org/category-opinion-1.html</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-27`)}}</span>
            <a class="wrap-break-word" href="https://iyouport.weebly.com/">https://iyouport.weebly.com/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-28`)}}</span>
            <a class="wrap-break-word" href="https://iyouport.wixsite.com/iyouport">https://iyouport.wixsite.com/iyouport</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-29`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-30`)}}</span>
            <a class="wrap-break-word" href="https://invite.mp.net/%2524gvrbMppG1s5ScrFaGA1AEew%253D%253D">https://invite.mp.net/%2524gvrbMppG1s5ScrFaGA1AEew%253D%253D</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-31`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-32`)}}</span>
            <a class="wrap-break-word" href="https://tieba.baidu.com/wxf/27925244?kw=%E5%AE%89%E9%82%A3%E7%A5%BA&fr=sharewise">https://tieba.baidu.com/wxf/27925244?kw=%E5%AE%89%E9%82%A3%E7%A5%BA&fr=sharewise</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-33`)}}</span>
            <a class="wrap-break-word" href="https://m.keyanba.xyz/bar?params=eyJiYXJJZCI6MTE0NX0%3D">https://m.keyanba.xyz/bar?params=eyJiYXJJZCI6MTE0NX0%3D</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-34`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-35`)}}</span>
            <code>phacct_d9f1ede7d339</code>
          </li>
          <li>
            <span>{{t(`${lp}.txt-36`)}}</span>
            <a class="wrap-break-word" href="https://www.zhihu.com/people/wxeng-96">https://www.zhihu.com/people/wxeng-96</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-37`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-38`)}}</span>
            <a class="wrap-break-word" href="https://www.instagram.com/anwan.tw?igsh=MnZiNmtpZ2xxanRy">https://www.instagram.com/anwan.tw?igsh=MnZiNmtpZ2xxanRy</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-5`)}}</span>
            <a class="wrap-break-word" href="https://www.facebook.com/share/19N9dL5fHA/">https://www.facebook.com/share/19N9dL5fHA/</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-39`)}}</span>
            <a class="wrap-break-word" href="https://www.threads.com/@anwan.tw">https://www.threads.com/@anwan.tw</a>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <strong>{{t(`${lp}.txt-40`)}}</strong>
        <ul>
          <li>
            <span>{{t(`${lp}.txt-1`)}}</span>
            <a class="wrap-break-word" href="https://anarchosyndchina.mystrikingly.com">https://anarchosyndchina.mystrikingly.com</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-13`)}}</span>
            <a class="wrap-break-word" href="https://x.com/AnarchoSynd_CN">https://x.com/AnarchoSynd_CN</a>
          </li>
          <li>
            <span>{{t(`${lp}.txt-17`)}}</span>
            <a class="wrap-break-word" href="mailto:AnarchoSyndChina@protomail.com">AnarchoSyndChina@protomail.com</a>
          </li>
        </ul>
      </div>
      -->
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.wrap-break-word{
  overflow-wrap: break-word
}
</style>