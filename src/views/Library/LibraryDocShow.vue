<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {useRoute} from "vue-router";
import docsData from "@/views/Library/ts/docsData.ts";
import VuePdfEmbed from 'vue-pdf-embed';

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

const vpe_source:Ref<string>=ref('');
const vpe_show:Ref<boolean>=ref(false);

onMounted(async ()=>{
  vpe_show.value = true;
  vpe_source.value=docFiles[`/src/views/Library/doc/${docData.value!.path}${docData.value!.fileName}`] as string;
});
</script>

<template>
<div id="libraryDocShow">
  <div class="container">
    <div class="row">
      <vue-pdf-embed v-show="vpe_show" :source="vpe_source"/>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>