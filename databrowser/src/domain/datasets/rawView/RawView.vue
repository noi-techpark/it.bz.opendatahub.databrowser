<template>
  <ContentAlignmentX>
    <div>
      <router-link
        :to="{
          path: '../79C93A2154142D4D35EE2C3B59543476_REDUCED/raw',
          hash: $route.hash,
        }"
        >79C93A2154142D4D35EE2C3B59543476_REDUCED/raw</router-link
      >|
      <router-link
        :to="{
          path: '../5CEA544EE34639034F07B79D4AEEB603_REDUCED/raw',
          hash: $route.hash,
        }"
        >5CEA544EE34639034F07B79D4AEEB603_REDUCED/raw</router-link
      >
    </div>
    <section v-if="isError" class="bg-red-200">
      <h2>Got error from API</h2>
      <div>{{ error }}</div>
    </section>
    <section v-if="isSuccess" class="bg-green-200">
      <div class="overflow-x-scroll p-4 rounded-xl border">
        <vue-json-pretty :data="(data as any)" :deep="3" show-length />
      </div>
      <DownloadSection :dataset="data" :dataset-url="url" hide-csv />
    </section>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { isError, isSuccess, data, error, url } =
  useApiForViewConfig(viewConfig);
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
