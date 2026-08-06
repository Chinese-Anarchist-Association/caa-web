<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {defineAsyncComponent, ref, type Ref} from "vue";
import { useHead } from '@unhead/vue';
import {isServer} from "@/ts/env/ssr.ts";
import {useCookies} from "@vueuse/integrations/useCookies";
import {useFavicon} from "@vueuse/core";
import isTrueCaa from "@/ts/global/isTrueCaa.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";

//动态按需加载caa页面
const ChessAmateurAssociation=defineAsyncComponent(() => import("@/views/ChessAmateurAssociation/ChessAmateurAssociation.vue"));

if (isServer) {
  useHead({
    htmlAttrs: {
      lang: 'zh',//html的lang静态值设置为zh。lang属性值将根据网站当前使用的语言动态更改
    }
  });
}

const view:Ref<HTMLElement|null> = ref(null);
function viewMtComput(data:number){//导航栏在获取了自身高度后将传递到这个函数。设置view的外高以避免导航栏遮挡内容
  if (view.value) {
    view.value.style.marginTop = `${data}px`;
  }
}

function isTrueCaa_trueDo() {
  import('@/glob/encImg.ts').then(mod=>{
    fetch(mod.default['/src/assets/img/logo/favicon.png.enc'] as string).then(res=>{
      res.text().then(rt=>{
        useFavicon().value=URL.createObjectURL(
          new Blob([
            decryptUint8Array(rt,defPw.value) as BlobPart
          ], { type: 'image/png' })
        );
      });
    });
  });
  loadGlobalLocale();
}

isTrueCaa.value = (()=>{
  const ck:boolean|undefined=useCookies().get('itcaa');
  if (ck!=undefined) {
    isTrueCaa_trueDo();
    return true;
  }
  else {
    useFavicon().value='';
    return false;
  }
})();
function itcaaSwitchHandler(){
  useCookies().set('itcaa',true,{
    path: '/',
    maxAge: 60*60*24*365,
    secure: true,
    sameSite: 'strict',
  });
  isTrueCaa_trueDo();
  isTrueCaa.value=true;
}
</script>

<template>
  <div v-if="isTrueCaa===true">
    <navbar v-on:navbarHeight="viewMtComput"/>
    <div ref="view" id="view">
      <router-view/>
    </div>
  </div>
  <div v-else-if="!isTrueCaa">
    <chess-amateur-association v-on:itcaaSwitch="itcaaSwitchHandler"/>
  </div>
</template>

<style scoped lang="scss">
</style>
