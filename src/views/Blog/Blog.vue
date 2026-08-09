<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/utils/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import blogsData, {type BlogsData, type IsEnc} from './ts/blogsData.ts';
import {getFromNowTime} from "@/utils/date.ts";
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import getFilePath from "@/views/Blog/ts/getFilePath.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";
import {isDev} from "@/ts/env/packMode.ts";
import Masonry from 'masonry-layout';

const {gt:t}=autoUseI18n();
const lp:string="view_Blog";

autoLoadLocale(lp,()=>{
  useTitle(`${t(`${lp}.title`)} - ${t('global.name')}`);
});

//所有封面图像的url
const allCoverImgsUrl:Ref<{id:number,url:string}[]>=ref([]);

onUnmounted(()=>{

})

/**
 * 获取封面图像文件并为其创建链接，并推送到allCoverImgsUrl
 * @param id id
 * @param uri uri
 * @param isEnc 加密后缀
 * @return 返回空的string，让img元素的src获取其以占位
 */
function pushCoverImgUrl(id:number, uri:string,isEnc:IsEnc|undefined):'' {
  (async () => {
    const fp=getFilePath(uri)
    const res = await fetch(fp);
    if (isEnc == 'enc') {
      const url = URL.createObjectURL(
          new Blob([
            decryptUint8Array(await res.text(), defPw.value) as BlobPart
          ])
      );
      allCoverImgsUrl.value.push({
        id:id,
        url:url,
      });
    } else {
      allCoverImgsUrl.value.push({
        id:id,
        url:fp,
      });
    }
  })();
  return '';
}
//处理作者数组并返回字符串
function getAuthor(input:string[]):string{
  let output='';
  for(let i=0;i<input.length;i++){
    output+=input[i];
    if (i+1<input.length){
      output+=', ';
    }
  }
  return output;
}

//当前页面的blogsData，将会过滤掉一些不符合条件的内容
const localView_blogsData:Ref<BlogsData> = ref([]);
(async ()=>{
  const output:BlogsData=[];
  blogsData.forEach(bdat=>{
    if (
        (bdat.id>=0 || isDev)
    ){
      output.push(bdat);
    }
  })
  localView_blogsData.value=output;
})();

const blogGrid:Ref<HTMLDivElement|null>=ref(null);
onMounted(()=>{
  if (blogGrid.value){
    new Masonry(blogGrid.value, {
      itemSelector: '.blog-item',
      percentPosition: true
    })
  }
})
</script>
<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t(`${lp}.title`)}}</h2>
    </div>
  </div>
  <div class="row" ref="blogGrid">
    <div v-for="(bd,index) in localView_blogsData" :key="index" class="blog-item col-12 col-md-6 col-xl-4 mb-3">
      <router-link :to="{name:`blog_ct-${bd.id}`}"
                   class="card blog-card"
      >
        <img alt="cover image"
             v-if="bd.cover.image"
             class="card-img-top"
             :src="allCoverImgsUrl.find(obj=>obj.id===bd.id)?.url || pushCoverImgUrl(bd.id ,bd.cover.image.uri,bd.cover.image.isEnc)"
        />
        <div class="card-body">
          <h4 class="card-title">{{bd.cover.title}}</h4>
          <p class="mb-1">{{bd.cover.summary}}</p>
        </div>
        <div class="card-footer">
          <div class="text-start position-absolute">
            <small class="text-body-secondary">{{getAuthor(bd.author)}}</small>
          </div>
          <div class="text-end">
            <small class="text-body-secondary">{{getFromNowTime(bd.lastModificationTime)}}</small>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/Blog.scss"></style>