<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {ref, type Ref} from "vue";
import { useHead } from '@unhead/vue';
import {isServer} from "@/ts/env/ssr.ts";
import isTrueCaa from "@/ts/global/isTrueCaa.ts";
import caaMask from "@/ts/App/caaMask.ts";

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
    view.value.style.setProperty("--view_margin-top", `${data}px`);
  }
}

const {ChessAmateurAssociation,itcaaSwitchHandler}=caaMask();
</script>

<template>
  <div v-if="isTrueCaa===true">
    <navbar v-on:navbarHeight="viewMtComput"/>
    <div ref="view" id="view">
      <router-view/>
    </div>
  </div>
  <div v-else-if="!isTrueCaa">
    <div v-if="ChessAmateurAssociation">
      <chess-amateur-association v-on:itcaaSwitch="itcaaSwitchHandler"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
#view{
  --view_margin-top: 0px;
}
</style>
<style lang="scss" src="@/assets/scss/fonts.scss"/>
