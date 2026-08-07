<script setup lang="ts">
import {useTitle} from "@vueuse/core";
import caaMaskCode from '@/json/caaMaskCode.json';

useTitle("国际象棋爱好者协会");

const emit = defineEmits(['itcaaSwitch']);

let abcInput:string="";
function abcClick(input:string){
  abcInput+=input;
  if (caaMaskCode.value.startsWith(abcInput)){
    if (abcInput==caaMaskCode.value){
      emit('itcaaSwitch');
    }
  }
  else abcInput=input;
}
</script>

<template>
  <div id="bg"></div>
<div id="ChessAmateurAssociation" class="container">
  <div class="row mt-6">
    <div class="col-12">
      <div class="row">
        <div class="col-6 col-md-4 order-1 order-md-0 df-jcc-aic">
          <img class="w-50" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/2.png" />
        </div>
        <div class="col-12 col-md-4 order-0 order-md-1 text-center unSelectable">
          <h1>国际象棋爱好者协会</h1>
          <h2>
            <span @click="abcClick('c');" @contextmenu.prevent="abcClick('c');">C</span>
            <span @click="abcClick('h');" @contextmenu.prevent="abcClick('h');">h</span>
            <span @click="abcClick('e');" @contextmenu.prevent="abcClick('e');">e</span>ss
            <span @click="abcClick('a');" @contextmenu.prevent="abcClick('a');">A</span>mateu<span @click="abcClick('r');" @contextmenu.prevent="abcClick('r');">r</span>
            Ass<span @click="abcClick('o');" @contextmenu.prevent="abcClick('o');">o</span>ciatio<span @click="abcClick('n');" @contextmenu.prevent="abcClick('n');">n</span></h2>
          <h6>这是我们共同的爱好</h6>
          <h6>This <span @click="abcClick('is');" @contextmenu.prevent="abcClick('is');">is</span> our share<span @click="abcClick('d');" @contextmenu.prevent="abcClick('d');">d</span> hobb<span @click="abcClick('y');" @contextmenu.prevent="abcClick('y');">y</span></h6>
        </div>
        <div class="col-6 col-md-4 order-2 order-md-2 df-jcc-aic">
          <img class="w-50" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/1.png" />
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-6">
      <h2>下棋时的注意事项</h2>
    </div>
    <div class="col-12">
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/3.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">下棋时要仔细思考，三思而后行。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">对弈时要保持安静，不要对你的对手使用战吼。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/4.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/5.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">赢下对局后，不可以骄傲自满的嘲讽对手。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">输掉对局后，不可以红温掀桌子，更不能殴打或用枪射击你的对手。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/6.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/7.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">败北后，请不要哭鼻子。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">思考时如果喜欢咬嘴唇，请不要太用力把嘴唇咬断。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/8.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/9.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">不能用棋子把墙壁砸出窟窿。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">不要把棋子独自留在山上看日出。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/10.png" />
        </div>
      </div>
    </div>
    <div class="col-12 text-center mt-4">
      <h2>棋手采访</h2>
    </div>
    <div class="col-12">
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/11.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这是一个正在思考的棋手，这很好。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这位棋手破防了，开始辱骂对手，这是不对的。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/12.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/13.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">即使流泪，也不忘继续思考棋局，他一定经历着某些令人伤心的事吧。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">他为这场棋局押了不少资产，看样子是要输了。请不要学他。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/14.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/15.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这位是一个带着墨镜并且正在咬嘴唇的棋手，这没有问题。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">开心的流泪，是有人在旁边切洋葱吗？</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/16.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/17.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这位棋手想靠泪水淹死对手，请各位不要学他。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">何意味？</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/18.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/19.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">看样子是墨镜让这位棋手汗如雨下，要不还是摘下墨镜吧。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这是一位因输棋躲到下水道哭泣的棋手，他可能是输掉了重要的棋局。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/20.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
        <div class="col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/21.png" />
        </div>
        <div class="col-md-6 df-jcc-aic">
          <span class="content-text">这是一位正在思考的……等等，你哪来的三只手。</span>
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-1">
        <div class="order-1 order-md-0 col-md-6 df-jcc-aic">
          <span class="content-text">这是一位在脑袋里安装作弊装置的选手，看来他得到了教训。</span>
        </div>
        <div class="order-0 order-md-1 col-md-6 df-jcc-aic">
          <img class="content-img" alt="img" loading="lazy" src="@/assets/img/ChessAmateurAssociation/22.png" />
        </div>
      </div>
      <div class="row pt-2 pt-md-0 pb-2 pb-md-0 secBg-0">
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