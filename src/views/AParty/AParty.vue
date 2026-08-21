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
    <svg-a-anarchy id="a_dj" class="anarchist red"/>

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