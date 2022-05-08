<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div class="p-4">
      <vue-json-pretty :data="(data as any)" :deep="3" show-length />
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { isError, isSuccess, data, error } = useApiForViewConfig({
  viewConfig,
  withQueryParameters: false,
});
</script>

<style>
.vjs-tree__brackets {
  @apply cursor-pointer;
}

.vjs-tree__brackets:hover {
  @apply text-blue-500;
}

.vjs-tree__node {
  @apply flex relative;
}

.vjs-tree__node.is-highlight,
.vjs-tree__node:hover {
  @apply bg-gray-100;
}

.vjs-tree__node .vjs-tree__indent {
  @apply flex-grow-0 flex-shrink-0;
  flex-basis: 1em;
}

.vjs-tree__node .vjs-tree__indent.has-line {
  @apply border-l border-dashed border-gray-300;
}

.vjs-comment {
  @apply text-gray-500 opacity-75;
}

.vjs-key {
  @apply pr-1.5 text-gray-900;
}

.vjs-value__null {
  @apply text-red-500;
}

.vjs-value__boolean,
.vjs-value__number {
  @apply text-blue-500;
}

.vjs-value__string {
  @apply text-green-600;
}

.vjs-tree {
  @apply text-left;
}
</style>
