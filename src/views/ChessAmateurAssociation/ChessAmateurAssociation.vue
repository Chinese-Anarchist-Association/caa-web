<script setup lang="ts">
import {useTitle} from "@vueuse/core";

useTitle("国际象棋爱好者协会");

const emit = defineEmits(['itcaaSwitch']);

//true key
const tk:string="AnarchyIsOrder".toLowerCase();
let abcInput:string="";
function abcClick(input:string){
  abcInput+=input;
  if (tk.startsWith(abcInput)){
    if (abcInput==tk){
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
    <div class="col-12 text-center unSelectable">
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
    <div class="col-12 text-center mt-6">
      <strong>正在开发中，敬请期待:)</strong>
    </div>
  </div>
</div>
</template>

<style scoped src="./scss/style.scss" lang="scss"></style>