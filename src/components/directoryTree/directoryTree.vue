<script setup lang="ts">
import {computed, type PropType} from 'vue';
import TreeNode from './treeNode.vue';
import {type btfpNode, type btfpPath, buildTreeFromPaths} from './ts/buildTreeFromPaths.js';

const props = defineProps({
  data: {
    type: Object as PropType<btfpPath[]>,
    required: true,
  }
});

// 自动识别数据格式并转换为树
const treeNodeData = computed(():btfpNode => {
  return buildTreeFromPaths(props.data);
});
</script>

<template>
  <div class="directory-tree">
    <TreeNode
        v-for="node in treeNodeData.children"
        :key="node.fullPath!"
        :node="node"
    />
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/component/directoryTree/directoryTree.scss"></style>
<style scoped lang="scss" src="./scss/directoryTree.scss"></style>