<script setup lang="ts">
import {ref, computed, type PropType} from 'vue';
import type {btfpNode} from "@/components/directoryTree/ts/buildTreeFromPaths.ts";

const props = defineProps({
  node: {
    type: Object as PropType<btfpNode>,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  }
});

//是文件夹的前提下，是否为打开状态
const isOpen = ref(false);

//是否是文件夹
const isFolder = computed(() => {
  return props.node.isDirectory && props.node.children;
});

function onClick(){
  if (isFolder.value) {//如果是目录的话执行开与关
    isOpen.value = !isOpen.value;
  }
  else {//非目录则执行携带的点击函数
    props.node.clickFunc!();
  }
}
</script>

<template>
  <div class="tree-node">
    <div
        class="node-content"
        :style="{ paddingLeft: `${depth * 20}px`/*根据深度位移*/}"
        @click="onClick"
    >
      <span v-if="isFolder" class="head-icon">
        <svg v-if="!isOpen" class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-folder-fill"></use></svg>
        <svg v-else class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-folder2-open"></use></svg>
      </span>
      <span v-else class="head-icon">
        <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-file-earmark-fill"></use></svg>
      </span>

      <span class="name">{{ node.name }}</span>
    </div>

    <div v-if="isFolder && isOpen" class="children">
      <TreeNode
          v-for="child in node.children"
          :key="child.fullPath!"
          :node="child"
          :depth="depth + 1"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/component/directoryTree/treeNode.scss"></style>
<style scoped lang="scss" src="./scss/treeNode.scss"></style>