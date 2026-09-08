<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {onUnmounted, ref, type Ref} from "vue";
import notice_baseUrl from "@/ts/env/notice_baseUrl.ts";
import type {NoticesData} from "@/views/Notice/ts/noticeData.ts";
import {isClient} from "@/ts/env/ssr.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

let allNoticesUrl:Ref<string[]>=ref([]);
const noticesGrid:Ref<HTMLDivElement|null>=ref(null);
let isUnmounted:boolean = false;
let Masonry:any = null;
(async ()=> {
  const ndRes = await fetch(`${notice_baseUrl['notice_baseUrl_1']}noticeData.json`);
  if (ndRes.ok) {
    const nd: NoticesData = await ndRes.json();
    allNoticesUrl.value = Array(nd.length);

    if (noticesGrid.value && isClient && !isUnmounted) {
      Masonry = (await import('masonry-layout')).default;//动态导入以避免ssg预渲染报错

      new Masonry(noticesGrid.value, {
        itemSelector: '.poster-item',
        percentPosition: true
      })
    }

    for (let i =0;i<nd.length;i++) {
      const targetUrl=`${notice_baseUrl['notice_baseUrl_1']}img/${nd[i]!.path}`;
      if (nd[i]!.isEnc){
        const res=await fetch(targetUrl);
        if (res.ok){
          allNoticesUrl.value[i]=(URL.createObjectURL(
              new Blob([
                decryptUint8Array(await res.text(), defPw.value) as BlobPart
              ])
          ));
        }
      }else{
        allNoticesUrl.value[i]=targetUrl;
      }
    }
  }
})();
onUnmounted(()=>{
  isUnmounted=true;
  allNoticesUrl.value.forEach(nu=>{
    if (nu!='')
      URL.revokeObjectURL(nu);
  });
});

const bigView:Ref<HTMLDivElement|null>=ref(null);
const bigView_img:Ref<HTMLImageElement|null>=ref(null);
function noticeImg_click(imgSrc:string,index:number){
  if (bigView.value && bigView_img.value){
    bigView_img.value.src = imgSrc;
    bigView_img.value.alt=`notice-${index}`;
    bigView.value.style.display = "";
  }
}
function bigView_click(){
  if (bigView.value){
    bigView.value.style.display = "none";
  }
}
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('title2')}}</h2>
    </div>
  </div>
  <div class="row" ref="noticesGrid">
    <div v-for="(notice,index) in allNoticesUrl" :key="index"
         class="notice-item col-12 col-md-6 col-xl-4 col-xxl-3 mb-3"
    >
      <div class="card">
        <img :alt="`notice-${index}`" :src="notice"
             class="card-img notice-img"
             @click="noticeImg_click(notice,index)"
        />
      </div>
    </div>
  </div>
</div>
  <div ref="bigView" id="bigView" @click="bigView_click" style="display: none;">
    <img alt="notice" ref="bigView_img"/>
  </div>
</template>

<style scoped lang="scss">
.notice-item{
  .notice-img{
    cursor: pointer;
  }
}

#bigView{
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  padding-top: var(--view_margin-top);
  img{
    position: relative;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
  }
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "公告",
    "title2": "公告栏"
  }
}
</i18n>