<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {useRoute} from "vue-router";
import docsData from "@/views/Library/ts/docsData.ts";
import VuePdfEmbed from 'vue-pdf-embed';
import { renderAsync } from 'docx-preview'
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const docFiles= import.meta.glob([
  '@/views/Library/doc/**/*.pdf',
  '@/views/Library/doc/**/*.docx'
], {
  eager: true,
  query: '?url',
  import: 'default',
});

const {lt:t,gt}=autoUseI18n();

function do_useTitle(ct:string|null = null){
  useTitle(`${ct!=null?`${ct} - `:''}${t('title')} - ${gt('global.name')}`);
}
do_useTitle();


const route = useRoute();
const meta = computed(() => ({
  doc:{
    id: route.meta.doc_id as number,
  },
}));

const docData = computed(()=> {
  return docsData.find(dd => dd.id === meta.value.doc.id);
});
const fileType = computed(():string|undefined => {
  if (docData.value){
    const fnSp=docData.value.fileName.split('.');
    return fnSp[fnSp.length-1];//获取后缀名
  }
});
function getFilePath(){
  return docFiles[`/src/views/Library/doc/${docData.value!.path}${docData.value!.fileName}`] as string;
}

const vpe_source:Ref<string>=ref('');
const vpe_show:Ref<boolean>=ref(false);

const docxView:Ref<HTMLDivElement|null> = ref(null);
const docxView_show:Ref<boolean>=ref(false);

onMounted(async ()=>{
  do_useTitle(docData.value?.classShow.name || docData.value?.fileName);
  switch (fileType.value) {
    case 'pdf':
      vpe_source.value=getFilePath();
      vpe_show.value = true;
      break;
    case 'docx':
      await renderAsync((await fetch(getFilePath())).blob(),docxView.value!);
      docxView_show.value=true;
      break;
  }
});
</script>

<template>
<div id="libraryDocShow">
  <div class="container pt-3">
    <div class="row">
      <div class="topTitleRoot col-12">
        <div class="g0 d-flex justify-content-start align-items-center">
          <h4>{{docData?.classShow.path}}/</h4>
        </div>
        <div class="g1 text-center">
          <h3>{{docData?.classShow.name || docData?.fileName}}</h3>
        </div>
        <div class="g2 d-flex justify-content-end align-items-center">
          <a class="btn btn-primary" :href="getFilePath()" :download="docData?.fileName">
            <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-download"></use></svg>
            {{t(`download`)}}
          </a>
        </div>
      </div>
      <div class="col-12 pt-2">
        <vue-pdf-embed v-show="vpe_show" :source="vpe_source"/>
        <div v-show="docxView_show" ref="docxView" />
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#libraryDocShow{
  .topTitleRoot{
    display: grid;
    grid-template-columns: repeat(3, 1fr);//三列等分
    grid-template-rows: auto;//一行
    grid-column-gap: .3rem;//行间距
    grid-row-gap: .2rem;//列间距
    grid-template-areas:
    "g0 g1 g2";

    .g0{
      grid-area: g0;
    }
    .g1{
      grid-area: g1;
    }
    .g2{
      grid-area: g2;
    }
  }
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "图书馆",
    "download": "下载"
  },
  "en-US": {
    "title": "Library",
    "download": "Download"
  }
}
</i18n>