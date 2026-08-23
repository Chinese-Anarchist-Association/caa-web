<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {onUnmounted, ref, type Ref} from "vue";
import posterImgFiles from "@/glob/posterImgFiles.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";
import {isClient} from "@/ts/env/ssr.ts";

const {lt:t,gt}=autoUseI18n();
useTitle(`${t('title')} - ${gt('global.name')}`);


/*const allPosters:Ref<string[]> = (()=>{
  const ap:string[]=[];
  for (let i=1;i<=6;i++){
    ap.push(posterImgFiles[`/src/views/Posters/img/${i}.jpg.enc`] as string);
  }
  return ref(ap);
})();*/

const allPostersUrl:Ref<string[]> = ref([]);
let isUnmounted:boolean = false;
const postersGrid:Ref<HTMLDivElement|null>=ref(null);
let Masonry:any = null;
(()=>{
  const allPosters:string[]=[];
  for (let i=1;i<=6;i++){
    allPosters.push(posterImgFiles[`/src/views/Posters/img/${i}.jpg.enc`] as string);
  }

  (async ()=>{
    for (let i=0;i<allPosters.length && !isUnmounted;i++){
      const res=await fetch(allPosters[i]!);
      if (!isUnmounted && res.ok) {
        allPostersUrl.value.push(URL.createObjectURL(
            new Blob([
              decryptUint8Array(await res.text(), defPw.value) as BlobPart
            ])
        ));
      }
    }

    if (postersGrid.value && isClient && !isUnmounted){
      Masonry=(await import('masonry-layout')).default;//动态导入以避免ssg预渲染报错

      new Masonry(postersGrid.value, {
        itemSelector: '.poster-item',
        percentPosition: true
      })
    }
  })();
})();
onUnmounted(()=>{
  isUnmounted=true;
  allPostersUrl.value.forEach(pu=>{
    URL.revokeObjectURL(pu);
  });
});
</script>

<template>
<div class="container pt-3">
  <div class="row" ref="postersGrid">
    <div v-for="(poster,index) in allPostersUrl" :key="index"
         class="poster-item col-12 col-md-6 col-xl-4 col-xxl-3 mb-3"
    >
      <div class="card">
        <img :alt="`poster-${index}`" :src="poster"
             class="card-img"
        />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.poster-item{
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "海报"
  },
  "en-US": {
    "title": "Posters"
  }
}
</i18n>