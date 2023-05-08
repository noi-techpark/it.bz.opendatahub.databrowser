<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-if="isSuccess === true">
    <div class="overflow-y-auto md:flex">
      <ContentAlignmentX class="overflow-y-auto py-6 md:flex">
        <VueJsonPretty
          :data="(data as any)"
          :deep="3"
          show-length
          class="flex-1"
        />
      </ContentAlignmentX>
      <ExportDatasetsToolBox :url="url" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useApiReadForCurrentDataset } from '../../api';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import ExportDatasetsToolBox from '../toolBox/ExportDatasetsToolBox.vue';
import LoadingError from '../../../components/loading/LoadingError.vue';
import 'vue-json-pretty/lib/styles.css';

const VueJsonPretty = defineAsyncComponent(() =>
  import('vue-json-pretty').then((exports) => exports.default)
);

const { isError, isSuccess, data, error, url } = useApiReadForCurrentDataset({
  withQueryParameters: false,
});
</script>

<style>
.vjs-tree-brackets:hover {
  @apply text-blue-500;
}

.vjs-tree-node.is-highlight,
.vjs-tree-node:hover {
  @apply bg-gray-100;
}

.vjs-key {
  @apply pr-1.5;
}

.vjs-value-null {
  @apply text-red-500;
}

.vjs-value-boolean,
.vjs-value-number {
  @apply text-blue-500;
}

.vjs-value-string {
  @apply text-green-600;
}

.vjs-tree {
  @apply text-left;
}
</style>
