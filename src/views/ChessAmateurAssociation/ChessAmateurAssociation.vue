<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import caaMaskCode from '@/json/caaMaskCode.json';
import aos from "@/plugins/aos.ts";
import {nextTick, onMounted, ref, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import type {ShareLinkPassCode} from "@/views/ShareLink/ts/sl.type.ts";
import {base62ToHex} from "@/utils/base62.ts";
import {decryptWordArray, HexToWordArray} from "@/utils/cryptoWordArray.ts";
import sharelinkPw from '@/json/sharelinkPw.json';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

useTitle("国际象棋爱好者协会");

const emit = defineEmits(['itcaaSwitch']);

let abcInput:string="";
const abcdInput:Ref<HTMLInputElement|null> = ref(null);
const abcdInput_isShow:Ref<boolean> = ref(false);
let ai1:boolean = false;
let ai2:boolean = false;

function abcClick(event: Event){
  const elem=event.target as HTMLSpanElement;
  
  abcInput+=elem.innerText.substring(0,1).toLowerCase();

  if (!abcdInput_isShow.value) abcdInput_isShow.value = true;
  if (abcInput==caaMaskCode.value) {
    abcdInput.value!.value = "同志你好";
    ai1 = true;
  }else if (ai1){
    abcdInput.value!.value = "同志再见";
    ai1 = false;
  }

  elem.style.display="none";
}
function abcdInput_kuOrC(event: Event){
  const elem=event.target as HTMLInputElement;

  if (
      ai1
      && elem.value==caaMaskCode.inputValue
      && abcdInput_isShow.value//避免多次触发
  ){
    abcdInput_isShow.value=false;
    emit('itcaaSwitch');
  }else if (!ai2 && !ai1){
    elem.value="恭喜你，发现第二个彩蛋:D";
    ai2=true;
  }
}

onMounted(async ()=>{
  if (isClient) {
    const urlParams = new URLSearchParams(window.location.search);
    const slpcEnc:string|null=urlParams.get('slpc');
    if (slpcEnc!=null){
      let slpc:ShareLinkPassCode|null=null;
      try{
        slpc=JSON.parse(decryptWordArray(HexToWordArray(base62ToHex(slpcEnc)),sharelinkPw.value));
      }catch{}
      if (slpc!=null){
        const date=dayjs(slpc.ed);
        if (date.isAfter(dayjs.utc(new Date()))){
          abcdInput_isShow.value=false;
          emit('itcaaSwitch');
        }else{
          abcdInput_isShow.value=true;
          await nextTick();
          abcdInput.value!.value="该分享已过期";
        }
      }
    }
  }
});

aos();
</script>

<template>
  <div id="bg"></div>
<div id="ChessAmateurAssociation" class="container">
  <div class="row mt-6">
    <div class="col-12">
      <div class="row">
        <div class="col-6 col-md-4 order-1 order-md-0 df-jcc-aic">
          <img class="w-50" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/2.png" data-aos="zoom-in-right"/>
        </div>
        <div class="col-12 col-md-4 order-0 order-md-1 text-center unSelectable">
          <h1 data-aos="zoom-in-down">国际象棋爱好者协会</h1>
          <h2 data-aos="zoom-in-down">
            <span class="abc-click" @click="(e:Event)=>abcClick(e)" @contextmenu.prevent="(e:Event)=>abcClick(e)">C</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">h</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">e</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">A</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">m</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">a</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">t</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">e</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">u</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">r</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">A</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">o</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">c</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">i</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">a</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">t</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">i</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">o</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">n</span>
          </h2>
          <h6 data-aos="zoom-in-up">这是我们共同的爱好</h6>
          <h6 data-aos="zoom-in-up">
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">T</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">h</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">i</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">i</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">o</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">u</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">r</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">s</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">h</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">a</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">r</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">e</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">d</span> <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">h</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">o</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">b</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">b</span>
            <span class="abc-click" @click="abcClick" @contextmenu.prevent="abcClick">y</span>
          </h6>
        </div>
        <div class="col-6 col-md-4 order-2 order-md-2 df-jcc-aic">
          <img class="w-50" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/1.png" data-aos="zoom-in-left"/>
        </div>
      </div>
    </div>
    <div class="col-12" v-if="abcdInput_isShow">
      <input type="text" class="form-control" id="abcdInput" ref="abcdInput" @keyup="abcdInput_kuOrC" @change="abcdInput_kuOrC" value="恭喜你，发现彩蛋:)">
    </div>
  </div>
  <div class="row mt-6">
    <div class="col-12 text-center">
      <h2 data-aos="flip-up">下棋时的注意事项</h2>
    </div>
    <div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/3.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">下棋时要仔细思考，三思而后行。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">对弈时要保持安静，不要对你的对手使用战吼。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/4.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/5.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">赢下对局后，不可以骄傲自满的嘲讽对手。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">输掉对局后，不可以红温掀桌子，更不能殴打或用枪射击你的对手。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/6.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/7.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">败北后，请不要哭鼻子。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">思考时如果喜欢咬嘴唇，请不要太用力把嘴唇咬断。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/8.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/9.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">不能用棋子把墙壁砸出窟窿。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">不要把棋子独自留在山上看日出。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/10.png" />
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-12 text-center">
      <h2 data-aos="flip-up">棋手采访</h2>
    </div>
    <div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/11.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这是一个正在思考的棋手，这很好。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这位棋手破防了，开始辱骂对手，这是不对的。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/12.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/13.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">即使流泪，也不忘继续思考棋局，他一定经历着某些令人伤心的事吧。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">他为这场棋局押了不少资产，看样子是要输了。请不要学他。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/14.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/15.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这位是一个带着墨镜并且正在咬嘴唇的棋手，这没有问题。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">开心的流泪，是有人在旁边切洋葱吗？</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/16.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/17.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这位棋手想靠泪水淹死对手，请各位不要学他。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">何意味？</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/18.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/19.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">看样子是墨镜让这位棋手汗如雨下，要不还是摘下墨镜吧。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这是一位因输棋躲到下水道哭泣的棋手，他可能是输掉了重要的棋局。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/20.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/21.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这是一位正在思考的……等等，你哪来的三只手。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1" data-aos="fade-left">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这是一位在脑袋里安装作弊装置的选手，看来他得到了教训。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/22.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0" data-aos="fade-right">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/23.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">呃呃呃，哥们你还好么……</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped src="./scss/style.scss" lang="scss"></style>
<style scoped lang="css" src="aos/dist/aos.css"></style>