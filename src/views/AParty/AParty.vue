<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);
</script>

<template>
<div id="aParty">
  <div id="scene">
    <div id="table"/>
    <div id="tableStep"/>
    <div id="speaker" class="a">
      <div class="circle c-s"></div>
      <div class="circle c-b"></div>
    </div>
    <div id="speaker" class="b">
      <div class="circle c-s"></div>
      <div class="circle c-b"></div>
    </div>
    <svg-a-anarchy id="a_dj" class="anarchist a-normal shake s-a"/>
    <svg-a-anarchy style="top: 500px;left: 600px;" class="anarchist a-syn shake s-c"/>
    <svg-a-anarchy style="top: 650px;left: 850px;" class="anarchist a-fem shake s-b"/>
    <svg-a-anarchy style="top: 550px;left: 1000px;" class="anarchist a-gre shake s-a"/>
    <svg-a-anarchy style="top: 600px;left: 700px;" class="anarchist a-pac shake s-d"/>
    <svg-a-anarchy style="top: 500px;left: 860px;" class="anarchist a-mut shake s-c"/>
    <svg-a-anarchy style="top: 620px;left: 525px;" class="anarchist a-que shake s-b"/>

    <div id="discoLight">
      <div id="discoLight_bulb">
        <svg-a-anarchy class="anarchist"/>
        <div class="bulb-light a"></div>
        <div class="bulb-light b"></div>
        <div class="bulb-light c"></div>
        <div class="bulb-light d"></div>
        <div class="bulb-light e"></div>
        <div class="bulb-light f"></div>
        <div class="bulb-light g"></div>
        <div class="bulb-light h"></div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/style.scss"/>
<style scoped lang="scss" src="./scss/objects.scss"/>

<i18n>
{
  "zh-CN": {
    "title": "安那其派对"
  }
}
</i18n>