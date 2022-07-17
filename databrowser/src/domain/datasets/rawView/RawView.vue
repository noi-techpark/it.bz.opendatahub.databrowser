<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div class="overflow-y-auto md:flex">
      <ContentAlignmentX class="overflow-y-auto py-6 md:flex">
        <vue-json-pretty
          :data="(data as any)"
          :deep="3"
          show-length
          class="flex-1"
        />
      </ContentAlignmentX>
      <ExportDatasetToolBox :url="url" />
    </div>
  </template>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import { useApiForCurrentDataset } from '../../api/client/client';
import ShowApiError from '../../api/components/ShowApiError.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import ExportDatasetToolBox from '../toolbox/ExportDatasetToolBox.vue';

const { isError, isSuccess, data, error, url } = useApiForCurrentDataset({
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
