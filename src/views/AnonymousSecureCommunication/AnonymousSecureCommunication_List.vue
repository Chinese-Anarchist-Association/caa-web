<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";

const {lt:t,gt}=autoUseI18n();

useTitle(`${t('title')} - ${gt('global.name')}`);
</script>

<template>
<div class="container pt-3">
  <div class="row">
    <div class="col-12 text-center">
      <h2>{{t('title')}}</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p class="text-center">{{t('description')}}</p>
    </div>
    <div class="col-12 col-md-6 mt-2 d-flex justify-content-center align-items-center">
      <div class="text-center">
        <router-link class="btn btn-primary" :to="{name:'anonymousSecureCommunication_publicRoom'}">{{t('joinPublicRoomBtn')}}</router-link>
        <p>{{t('joinPublicRoomDesc')}}</p>
      </div>
    </div>
    <div class="col-12 col-md-6 mt-2 d-flex justify-content-center align-items-center">
      <div class="text-center">
        <router-link class="btn btn-primary" :to="{name:'anonymousSecureCommunication_privateRoom'}">{{t('joinPrivateRoomBtn')}}</router-link>
        <p>{{t('joinPrivateRoomDesc')}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "title": "匿名安全通信",
    "description": "点对点通信技术，去中心化，没有中间服务器窃取你的信息；实时信息，聊天信息不会主动以任何形式保存在任何地点；端到端加密，确保交流信息的安全；匿名，用户无需进行任何登录操作。",
    "joinPublicRoomBtn": "进入公共通讯频道",
    "joinPrivateRoomBtn": "进入私人通讯频道",
    "joinPublicRoomDesc": "任何人都可以进入的公共频道。",
    "joinPrivateRoomDesc": "需要输入共享密码的私人频道。"
  }
}
</i18n>