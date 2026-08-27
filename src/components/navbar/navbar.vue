<script setup lang="ts">
import { autoLoadLocale } from "@/utils/vue/autoLoadLocale";
import {autoUseI18n, getCurrentLocale, switchLocale} from "@/utils/i18nUtils.ts";
import {onMounted, onUnmounted, type Ref, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useCookies} from "@vueuse/integrations/useCookies";
import isUseCaaMask from "@/ts/env/isUseCaaMask.ts";
import {isDev} from "@/ts/env/packMode.ts";
import {isClient} from "@/ts/env/ssr.ts";

const route = useRoute();

const emit = defineEmits(['navbarHeight']);
const { gt:t } = autoUseI18n();
const lp:string="comp_navbar";
autoLoadLocale(lp);

const curLoc:Ref<string>= ref(getCurrentLocale());
async function doLangSel(lang:string){
  await switchLocale(lang);
  curLoc.value=getCurrentLocale();
}

//region theme
const themeIcon:Ref<string> = ref("svg-bsi-circle-half");
const curTheme:Ref<string> = ref("auto");
function doThemeSel(tme:string,setCookie:boolean=true){
  const html:HTMLHtmlElement = document.querySelector("html")!;
  switch(tme){
    case 'auto':
      themeIcon.value = 'svg-bsi-circle-half';
      if (window.matchMedia("(prefers-color-scheme: dark)").matches)
        html.setAttribute('data-bs-theme','dark');
      else
        html.setAttribute('data-bs-theme','light');
      break;
    case 'light':
      themeIcon.value = 'svg-bsi-sun';
      html.setAttribute('data-bs-theme','light');
      break;
    case 'dark':
      themeIcon.value = 'svg-bsi-moon-stars';
      html.setAttribute('data-bs-theme','dark');
      break;
  }
  curTheme.value=tme;

  if (setCookie)
    useCookies().set('theme', tme,{
      maxAge: 60*60*24*365,
    });
}
onMounted(()=>{
  if (isDev) {
    const theme: 'dark' | 'light' | 'auto' | undefined = useCookies().get('theme');
    if (theme)
      doThemeSel(theme, false);
    else
      doThemeSel('auto', true);
  }else {
    doThemeSel('dark');//目前暂不对亮色模式支持，生产模式下默认暗色模式
  }
});
//endregion

const navbar:Ref<HTMLElement|null> = ref(null);
let navbarResizeObserver:ResizeObserver|null=null;
onMounted(()=>{
  navbarResizeObserver=new ResizeObserver((/*entries*/)=>{//监听元素尺寸变化
    //entries.forEach(()=>{
      emit('navbarHeight',navbar.value!.offsetHeight);
    //});
  });
  navbarResizeObserver.observe(navbar.value!);
})
onUnmounted(()=>{
  navbarResizeObserver?.disconnect();
})

//region curRouteName
const curRouteName:Ref<string|undefined>=ref(undefined);
watch(
    ()=>route.name,
    ()=>{routeName_onChange();}
)
function routeName_onChange(){
  curRouteName.value=route.name as string|undefined;
}
//endregion

function leaveBtn_click(){
  useCookies().remove('itcaa',{
    path: '/',
  });
  location.reload();
}

function getLocationHref(){
  return window.location.href;
}
</script>

<template>
  <nav ref="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home'}" id="navbar-head-btn">
        <span>C</span>
        <svg-a-anarchy class="svgObj"/>
        <span>A</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav flex-row flex-wrap me-auto nav-0">
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='home')}" aria-current="page" :to="{ name: 'home'}">{{t(`${lp}.home`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='posters')}" aria-current="page" :to="{ name: 'posters'}">{{t(`${lp}.posters`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='blog' || curRouteName?.startsWith('blog_ct-'))}" aria-current="page" :to="{ name: 'blog'}">{{t(`${lp}.blog`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='library' || curRouteName?.startsWith('library_doc-'))}" aria-current="page" :to="{ name: 'library'}">{{t(`${lp}.library`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='aboutUs')}" aria-current="page" :to="{ name: 'aboutUs'}">{{t(`${lp}.aboutUs`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='joinUs')}" aria-current="page" :to="{ name: 'joinUs'}">{{t(`${lp}.joinUs`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='motionMatrix')}" aria-current="page" :to="{ name: 'motionMatrix'}">{{t(`${lp}.motionMatrix`)}}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav flex-row flex-wrap nav-1">
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='encAndDec')}" aria-current="page" :to="{ name: 'encAndDec'}">{{t(`${lp}.encAndDec`)}}</router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto text-center">
            <router-link class="nav-link" :class="{'active':(curRouteName=='onlineSelfVerificationor')}" aria-current="page" :to="{ name: 'onlineSelfVerificationor'}">{{t(`${lp}.onlineSelfVerificationor`)}}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav flex-row flex-wrap nav-2">
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item col-6 col-lg-auto dropdown d-flex flex-ai-c justify-content-center" v-if="isDev"><!--目前生产模式暂不对亮色模式支持，禁用主题切换-->
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg-bsi-circle-half class="bi" width="24" height="24" v-if="themeIcon=='svg-bsi-circle-half'"></svg-bsi-circle-half>
              <svg-bsi-sun class="bi" width="24" height="24" v-else-if="themeIcon=='svg-bsi-sun'"></svg-bsi-sun>
              <svg-bsi-moon-stars class="bi" width="24" height="24" v-else-if="themeIcon=='svg-bsi-moon-stars'"></svg-bsi-moon-stars>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t(`${lp}.theme.theme-sel`)}}</h6>
              </li>
              <li>
                <button @click="doThemeSel('auto')" :class="{ 'active': (curTheme=='auto') }" class="dropdown-item">
                  <svg-bsi-circle-half class="bi" width="16" height="16" ></svg-bsi-circle-half>
                  {{t(`${lp}.theme.auto`)}}
                  <svg :style="(curTheme!='auto')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doThemeSel('light')" :class="{ 'active': (curTheme=='light') }" class="dropdown-item">
                  <svg-bsi-sun class="bi" width="16" height="16" ></svg-bsi-sun>
                  {{t(`${lp}.theme.light`)}}
                  <svg :style="(curTheme!='light')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doThemeSel('dark')" :class="{ 'active': (curTheme=='dark') }" class="dropdown-item">
                  <svg-bsi-moon-stars class="bi" width="16" height="16" ></svg-bsi-moon-stars>
                  {{t(`${lp}.theme.dark`)}}
                  <svg :style="(curTheme!='dark')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item col-6 col-lg-auto dropdown d-flex flex-ai-c justify-content-center">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg-bsi-translate class="bi" width="24" height="24" ></svg-bsi-translate>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t(`${lp}.langs.lang-sel`)}}</h6>
              </li>
              <li>
                <button @click="doLangSel('zh-CN')" :class="{ 'active': (curLoc=='zh-CN') }" class="dropdown-item">
                  简体中文{{(curLoc!='zh-CN')?`(${t(`${lp}.langs.zh-CN`)})`:''}}<!--{{t(`${lp}.ttii`)/*翻译不完整批注，后续完成翻译后需要手动移除该字样*/}}-->
                  <svg :style="(curLoc!='zh-CN')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('en-US')" :class="{ 'active': (curLoc=='en-US') }" class="dropdown-item">
                  English{{(curLoc!='en-US')?`(${t(`${lp}.langs.en-US`)})`:''}}
                  <svg :style="(curLoc!='en-US')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('zh-Hant')" :class="{ 'active': (curLoc=='zh-Hant') }" class="dropdown-item">
                  繁體中文{{(curLoc!='zh-Hant')?`(${t(`${lp}.langs.zh-Hant`)})`:''}}
                  <svg :style="(curLoc!='zh-Hant')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('es')" :class="{ 'active': (curLoc=='es') }" class="dropdown-item">
                  Español{{(curLoc!='es')?`(${t(`${lp}.langs.es`)})`:''}}
                  <svg :style="(curLoc!='es')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('ru')" :class="{ 'active': (curLoc=='ru') }" class="dropdown-item">
                  русский{{(curLoc!='ru')?`(${t(`${lp}.langs.ru`)})`:''}}
                  <svg :style="(curLoc!='ru')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('pt-PT')" :class="{ 'active': (curLoc=='pt-PT') }" class="dropdown-item">
                  Português{{(curLoc!='pt-PT')?`(${t(`${lp}.langs.pt-PT`)})`:''}}
                  <svg :style="(curLoc!='pt-PT')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('el')" :class="{ 'active': (curLoc=='el') }" class="dropdown-item">
                  Ελληνικά{{(curLoc!='el')?`(${t(`${lp}.langs.el`)})`:''}}
                  <svg :style="(curLoc!='el')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('id-ID')" :class="{ 'active': (curLoc=='id-ID') }" class="dropdown-item">
                  Bahasa Indonesia{{(curLoc!='id-ID')?`(${t(`${lp}.langs.id-ID`)})`:''}}
                  <svg :style="(curLoc!='id-ID')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item col-6 col-lg-auto d-flex flex-ai-c justify-content-center">
            <router-link type="button" class="btn btn-link nav-link" :to="{name: 'shareLink',state: {'curLH':(isClient)?getLocationHref():''}}">
              <svg-bsi-share class="bi" width="24" height="24" ></svg-bsi-share>
            </router-link>
          </li>
          <li class="nav-item col-6 col-lg-auto d-flex flex-ai-c justify-content-center" v-if="isUseCaaMask==='true'">
            <button type="button" class="btn btn-link nav-link" @click="leaveBtn_click">
              <svg-bsi-box-arrow-right class="bi" width="24" height="24" ></svg-bsi-box-arrow-right>
            </button>
          </li>
          <!--<li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item py-2 d-flex flex-ai-c">
            <a href="https://github.com/Hgnim/libre-tool-hub">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-github"></use></svg>
            </a>
          </li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss" src="./scss/navbar.scss"></style>