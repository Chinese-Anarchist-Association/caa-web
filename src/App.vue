<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {defineAsyncComponent, ref, type Ref} from "vue";
import { useHead } from '@unhead/vue';
import {isServer} from "@/ts/env/ssr.ts";
import {useCookies} from "@vueuse/integrations/useCookies";
import {useFavicon} from "@vueuse/core";

//动态按需加载caa页面
const ChessAmateurAssociation=defineAsyncComponent(() => import("@/views/ChessAmateurAssociation/ChessAmateurAssociation.vue"));

if (isServer) {
  useHead({
    htmlAttrs: {
      lang: 'zh',//html的lang静态值设置为zh。lang属性值将根据网站当前使用的语言动态更改
    }
  });
}

loadGlobalLocale();

const view:Ref<HTMLElement|null> = ref(null);
function viewMtComput(data:number){//导航栏在获取了自身高度后将传递到这个函数。设置view的外高以避免导航栏遮挡内容
  if (view.value) {
    view.value.style.marginTop = `${data}px`;
  }
}

const isTrueCaa:Ref<boolean> = ref((()=>{
  const ck:boolean|undefined=useCookies().get('itcaa');
  if (ck!=undefined) {
    useFavicon().value='/favicon.png';
    return ck;
  }
  else {
    useFavicon().value='';
    return false;
  }
})());
function itcaaSwitchHandler(){
  useCookies().set('itcaa',true,{
    path: '/',
    maxAge: 60*60*24*365,
    secure: true,
    sameSite: 'strict',
  })
  isTrueCaa.value=true;
  useFavicon().value='/favicon.png';
}
</script>

<template>
  <div v-if="isTrueCaa">
    <navbar v-on:navbarHeight="viewMtComput"/>
    <div ref="view" id="view">
      <router-view/>
    </div>
  </div>
  <div v-else>
    <chess-amateur-association v-on:itcaaSwitch="itcaaSwitchHandler"/>
  </div>
</template>

<style scoped lang="scss">
</style>
