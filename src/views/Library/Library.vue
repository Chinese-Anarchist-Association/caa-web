<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import DirectoryTree from "@/components/directoryTree/directoryTree.vue";
import {computed} from "vue";
import type {btfpPath} from "@/components/directoryTree/ts/buildTreeFromPaths.ts";
import docsData from "@/views/Library/ts/docsData.ts";
import {useRouter} from "vue-router";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);

const router = useRouter();

function dtFile_click(id:number){
  router.push({ name: `library_doc-${id}`});//跳转至目标地址
}


const dtData=computed(():btfpPath[]=>{//将所有文档数据整理后传递至目录树绘制
  const bp:btfpPath[] = [];
  docsData.forEach((dd)=>{
    if(dd.id>=0){//负数编号的为测试文档，不需要列入
      bp.push({
        name: dd.classShow.name || dd.fileName,
        path: dd.classShow.path,
        clickFunc:()=>{
          dtFile_click(dd.id);
        },
      });
    }
  });
  return bp;
});
</script>

<template>
<div id="library">
  <div class="container pt-3">
    <div class="row">
      <div class="col-12 text-center">
        <h2>{{t('title')}}</h2>

        <DirectoryTree :data="dtData"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "title": "图书馆"
  },
  "en-US": {
    "title": "Library"
  }
}
</i18n>