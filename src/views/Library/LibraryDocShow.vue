<script setup lang="ts">
import {computed, onMounted, type Ref, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import docsData from "@/views/Library/ts/docsData.ts";
import { renderAsync } from 'docx-preview'
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {isClient} from "@/ts/env/ssr.ts";
//import {md_libraryDocs} from "@/ts/env/moduleDisable.ts";
//@ts-ignore 该别名将会在@/../ts/vite/resolveAlias.node.ts中动态添加
import docFiles from "@@glob/libraryDocFiles.ts";
import fetchProgress from "fetch-progress";
import {filesize} from "filesize";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import libraryDocs_baseUrl from "@/ts/env/libraryDocs_baseUrl.ts";
import {type MdzipColorScheme, MdzipWorkspaceView} from "@mdzip/editor";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from '@/json/defPw.json';

const VuePdfEmbed:any = shallowRef(null);

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
  if (docFiles!=null && docData.value) {
    //处理变量字段后的uri字符串
    let afterActionUri=(()=>{
      let output='';
      const aauSp:string[]=docData.value.uri.split('$$$');
      if (aauSp.length>1){
        for (let i=0;i<aauSp.length;i++){
          if (i%2!=0){
            output+=libraryDocs_baseUrl[aauSp[i] as string] || '';
          }else output+=aauSp[i];
        }
      }else return docData.value.uri;
      return output;
    })();

    if (afterActionUri.startsWith('http')){
      if (afterActionUri.endsWith('/'))
        return `${afterActionUri}${docData.value.fileName}`;
      else
        return afterActionUri;
    }else{
      return docFiles[`/src/views/Library/doc/${afterActionUri}${docData.value.fileName}`] as string;
    }
  }
  else
    return '';
}

dayjs.extend(duration);//注册dayjs的duration插件

const vpe_source:Ref<(Uint8Array<ArrayBufferLike>)|null>=ref(null);
const vpe_show:Ref<boolean>=ref(false);

const docxView:Ref<HTMLDivElement|null> = ref(null);
const docxView_show:Ref<boolean>=ref(false);

//const txtView:Ref<HTMLDivElement|null> = ref(null);
const txtView_show:Ref<boolean>=ref(false);
const txtView_content:Ref<string>=ref('');

const mdzView:Ref<HTMLDivElement|null> = ref(null);
const mdzView_show:Ref<boolean>=ref(false);

/*enum LoadStatus{
  loading,done,error,
}*/
type LoadStatus='init'|'waitLoad'|'loading'|'done'|'error'|'notSupport';
const loadStatus:Ref<LoadStatus>=ref('init');

onMounted(async ()=>{
  if (isClient){//动态且仅在客户端加载vue-pdf-embed组件，避免ssg构建失败
    VuePdfEmbed.value=(await import('vue-pdf-embed')).default;
  }

  do_useTitle(docData.value?.classShow.name || docData.value?.fileName);

  loadStatus.value='waitLoad';
});

const loading_speed:Ref<number>=ref(-1);
const loading_percentage:Ref<number>=ref(-1);
const loading_eta:Ref<number>=ref(-1);
const loading_total:Ref<number>=ref(-1);
//已下载的字节数
const loading_transferred:Ref<number>=ref(-1);
//剩余未下载的字节数
const loading_remaining:Ref<number>=ref(-1);
async function doLoad(){
  loadStatus.value='loading';
  const res=await fetch(getFilePath()).then(
      fetchProgress({
        onProgress(prog){
          //console.log('progress:', prog);
          loading_speed.value=prog.speed??-1;
          //@ts-ignore
          loading_percentage.value=prog.percentage??-1;
          //loading_eta.value=prog.eta;//它自带的剩余时间计算存在问题，因此自己计算
          //@ts-ignore
          loading_eta.value=(prog.remaining && prog.speed && prog.remaining!=0 && prog.speed!=0)?(prog.remaining/prog.speed):-1;
          loading_total.value=prog.total??-1;
          loading_transferred.value=prog.transferred??-1;
          //@ts-ignore
          loading_remaining.value=prog.remaining??-1;
        }
      })
  );
  if (res.ok || res.status==304) {
    //动态fileType
    let ft=fileType.value;
    const decData:Uint8Array|null=await (async ()=>{
      try {
        if (ft == 'enc') {
          ft = ((): string | undefined => {
            if (docData.value) {
              const fnSp = docData.value.fileName.split('.');
              return fnSp[fnSp.length - 2];//获取二级后缀名
            }
          })()
          return decryptUint8Array(await res.text(), defPw.value);
        } else
          return null;
      }catch {
        loadStatus.value='error';
        throw new Error();
      }
    })();

    switch (ft) {
      case 'pdf':
        if (decData!=null)
          vpe_source.value = decData;
        else
          vpe_source.value = new Uint8Array(await res.arrayBuffer());
        vpe_show.value = true;
        break;
      case 'docx':
        if (decData!=null)
          await renderAsync(new Blob([decData as BlobPart]),docxView.value!);
        else
          await renderAsync(res.blob(), docxView.value!);
        docxView_show.value = true;
        break;
      case 'txt':
        if (decData!=null)
          txtView_content.value = await new Blob([decData as BlobPart]).text();
        else
          txtView_content.value = await res.text();
        txtView_show.value = true;
        break;
      case 'mdz':
      case 'md':
      {
        const view = new MdzipWorkspaceView(mdzView.value!,{
          controls: 'preview',
          initialLayout: 'preview',
          initialColorScheme: document.querySelector("html")!.getAttribute('data-bs-theme') as MdzipColorScheme,
        });
        const u8a=await (async ()=>{
          if (decData!=null)return decData;
          else return new Uint8Array(await res.arrayBuffer());
        })()
        await view.open(u8a,{
          mode: 'read-only',
          fileName: `.${ft}`,
        });
        mdzView_show.value = true;
      }
        break;
      default:
        loadStatus.value='notSupport';
        break;
    }
    if (loadStatus.value=='loading')
      loadStatus.value='done';
  }else loadStatus.value='error';
}
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
          <h3>{{docData?.classShow.name || docData?.fileName}} {{(docData?.fileName.endsWith('.enc'))?t('isEnc'):''}}</h3>
        </div>
        <div class="g2 d-flex justify-content-end align-items-center">
          <a class="btn btn-primary" :href="getFilePath()" :download="docData?.classShow.name || docData?.fileName">
            <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-download"></use></svg>
            {{t(`download`)}}
          </a>
        </div>
      </div>
      <div class="col-12 pt-2">
        <div v-show="loadStatus!='done'" class="text-center">
          <div v-if="loadStatus=='loading'">
            <span>{{t('loading')}}</span><br/>
            <span v-if="loading_total!=-1 && loading_total!=0">{{`${t('total')}${(loading_total!=-1)?filesize(loading_total):''}`}}</span><br/>
            <span v-if="loading_transferred!=-1 && loading_transferred!=0">{{`${t('transferred')}${(loading_transferred!=-1)?filesize(loading_transferred):''}`}}</span><br/>
            <span v-if="loading_remaining!=-1">{{`${t('remaining')}${(loading_remaining!=-1)?filesize(loading_remaining):''}`}}</span><br/>
            <span v-if="loading_speed!=-1">{{`${t('speed')}${(loading_speed!=-1)?filesize(loading_speed):''}/s`}}</span><br/>
            <span v-if="loading_eta!=-1 && loading_eta!=0">{{`${t('eta')}${(loading_eta!=-1)?(dayjs.duration(Math.round(loading_eta*1000),'ms').format('HH:mm:ss:SSS')):''}`}}</span><br/>
            <span v-if="loading_percentage!=-1 && loading_percentage!=0">{{`${t('percentage')}${loading_percentage}%`}}</span>
          </div>
          <span v-else-if="loadStatus=='error'">{{t('error')}}</span>
          <span v-else-if="loadStatus=='notSupport'">{{t('notSupport')}}</span>
          <div v-else-if="loadStatus=='waitLoad'">
            <button class="btn btn-primary" @click="doLoad();">{{t('previewOnline')}}</button>
          </div>
          <span v-else-if="loadStatus=='init'">{{t('initing')}}</span>
        </div>
        <div v-if="isClient && VuePdfEmbed">
          <VuePdfEmbed v-show="vpe_show" :source="vpe_source"/>
        </div>
        <div v-show="docxView_show" ref="docxView" />
        <div v-show="txtView_show" id="txtView"><!--ref="txtView"-->
          <span>{{txtView_content}}</span>
        </div>
        <div v-show="mdzView_show" ref="mdzView"></div>
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
  #txtView{
    span{
      white-space: pre-line;
    }
  }
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "图书馆",
    "download": "下载",
    "loading": "正在加载",
    "error": "加载失败",
    "notSupport": "不支持在线浏览该文件",
    "previewOnline": "在线预览",
    "initing": "初始化中",
    "total": "总大小：",
    "transferred": "已加载：",
    "remaining": "剩余：",
    "speed": "速度：",
    "eta": "剩余时间：",
    "percentage": "进度：",
    "isEnc": "（加密文档）"
  },
  "en-US": {
    "title": "Library",
    "download": "Download",
    "loading": "Loading...",
    "error": "Error.",
    "notSupport": "Not support.",
    "previewOnline": "Preview Online",
    "initing": "Initializing"
  }
}
</i18n>