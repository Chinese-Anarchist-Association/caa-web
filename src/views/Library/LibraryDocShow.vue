<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {useRoute} from "vue-router";
import docsData from "@/views/Library/ts/docsData.ts";
import VuePdfEmbed from 'vue-pdf-embed';
import { renderAsync } from 'docx-preview'

const docFiles= import.meta.glob([
  '@/views/Library/doc/**/*.pdf',
  '@/views/Library/doc/**/*.docx'
], {
  eager: true,
  query: '?url',
  import: 'default',
});

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
  <div class="container">
    <div class="row">
      <vue-pdf-embed v-show="vpe_show" :source="vpe_source"/>
      <div v-show="docxView_show" ref="docxView" />
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>