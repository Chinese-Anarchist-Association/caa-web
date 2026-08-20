<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, ref, type Ref} from "vue";
import blogsData from "@/views/Blog/ts/blogsData.ts";
import fetchProgress from "fetch-progress";
import {filesize} from "filesize";
import dayjs from "dayjs";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import duration from "dayjs/plugin/duration";
import getFilePath from "@/views/Blog/ts/getFilePath.ts";
import {decryptUint8Array} from "@/utils/crypto.ts";
import defPw from "@/json/defPw.json";
import {type MdzipColorScheme, MdzipWorkspaceView} from "@mdzip/editor";
import {useTitle} from "@vueuse/core";
import {getFormatTime} from "@/utils/date.ts";
import getAuthorStr from "@/views/Blog/ts/getAuthorStr.ts";
import checkAndDecString from "@/utils/checkAndDecString.ts";

const {lt:t,gt}=autoUseI18n();

function do_useTitle(ct:string|null = null){
  useTitle(`${ct!=null?`${checkAndDecString(ct)} - `:''}${t('title')} - ${gt('global.name')}`);
}
do_useTitle();

const route = useRoute();
const meta = computed(() => ({
  content:{
    id: route.meta.ct_id as number,
  },
}));

const blogData=computed(() => {
  return blogsData.find(bd=>bd.id===meta.value.content.id);
});

const loadStatus:Ref<'loading'|'done'|'error'>=ref('loading');

dayjs.extend(duration);//注册dayjs的duration插件

const blogView:Ref<HTMLDivElement|null> = ref(null);

const loading_speed:Ref<number>=ref(-1);
const loading_percentage:Ref<number>=ref(-1);
const loading_eta:Ref<number>=ref(-1);
const loading_total:Ref<number>=ref(-1);
//已下载的字节数
const loading_transferred:Ref<number>=ref(-1);
//剩余未下载的字节数
const loading_remaining:Ref<number>=ref(-1);
onMounted(async ()=>{
  do_useTitle(blogData.value?.cover.title);

  if (blogData.value) {
    const res = await fetch(getFilePath(blogData.value.blog.uri)).then(
        fetchProgress({
          onProgress(prog) {
            //console.log('progress:', prog);
            loading_speed.value = prog.speed ?? -1;
            //@ts-ignore
            loading_percentage.value = prog.percentage ?? -1;
            //loading_eta.value=prog.eta;//它自带的剩余时间计算存在问题，因此自己计算
            //@ts-ignore
            loading_eta.value = (prog.remaining && prog.speed && prog.remaining != 0 && prog.speed != 0) ? (prog.remaining / prog.speed) : -1;
            loading_total.value = prog.total ?? -1;
            loading_transferred.value = prog.transferred ?? -1;
            //@ts-ignore
            loading_remaining.value = prog.remaining ?? -1;
          }
        })
    );
    if (res.ok || res.status==304) {
      let u8a: Uint8Array;
      if (blogData.value.blog.isEnc == 'enc') {
        u8a = decryptUint8Array(await res.text(), defPw.value);
      } else {
        u8a = new Uint8Array(await res.arrayBuffer());
      }

      const view = new MdzipWorkspaceView(blogView.value!,{
        controls: 'preview',
        initialLayout: 'preview',
        initialColorScheme: document.querySelector("html")!.getAttribute('data-bs-theme') as MdzipColorScheme,
      });
      await view.open(u8a, {
        mode: 'read-only',
        fileName: `.${blogData.value.blog.fileType}`,
      });
      loadStatus.value='done';
    }else loadStatus.value='error';
  }
});
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center" v-if="loadStatus==='loading'">
      <span>{{t('loading')}}</span><br/>
      <span v-if="loading_total!=-1 && loading_total!=0">{{`${t('total')}${(loading_total!=-1)?filesize(loading_total):''}`}}</span><br/>
      <span v-if="loading_transferred!=-1 && loading_transferred!=0">{{`${t('transferred')}${(loading_transferred!=-1)?filesize(loading_transferred):''}`}}</span><br/>
      <span v-if="loading_remaining!=-1">{{`${t('remaining')}${(loading_remaining!=-1)?filesize(loading_remaining):''}`}}</span><br/>
      <span v-if="loading_speed!=-1">{{`${t('speed')}${(loading_speed!=-1)?filesize(loading_speed):''}/s`}}</span><br/>
      <span v-if="loading_eta!=-1 && loading_eta!=0">{{`${t('eta')}${(loading_eta!=-1)?(dayjs.duration(Math.round(loading_eta*1000),'ms').format('HH:mm:ss:SSS')):''}`}}</span><br/>
      <span v-if="loading_percentage!=-1 && loading_percentage!=0">{{`${t('percentage')}${loading_percentage}%`}}</span>
    </div>
    <div class="col-12" v-else-if="loadStatus==='error'">
      {{t('error')}}
    </div>
    <div class="col-12" v-show="loadStatus==='done'">
      <div ref="blogView" id="blogView"></div>
      <div class="row">
        <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center">
          <div>
            <span>{{t('creationTime')}}{{(blogData)?getFormatTime(blogData.creationTime):''}}</span><br/>
            <span>{{t('lastModificationTime')}}{{(blogData)?getFormatTime(blogData.lastModificationTime):''}}</span>
          </div>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center">
          <span>{{t('author')}}{{blogData?getAuthorStr(blogData.author):''}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#blogView{
  --theme-editor-background-color:transparent;
  --mdzip-preview-content-padding:0;
}
</style>

<i18n>
{
  "zh-CN": {
    "title": "博客",
    "loading": "正在加载",
    "error": "加载失败",
    "total": "总大小：",
    "transferred": "已加载：",
    "remaining": "剩余：",
    "speed": "速度：",
    "eta": "剩余时间：",
    "percentage": "进度：",
    "creationTime": "创建时间：",
    "lastModificationTime": "最后修改：",
    "author": "作者："
  },
  "en-US": {
    "title": "Blog",
    "loading": "Loading...",
    "error": "Error."
  }
}
</i18n>