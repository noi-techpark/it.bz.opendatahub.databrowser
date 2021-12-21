<template>
  <ContentAlignmentX>
    <div v-if="apiResult.isFetching">Loading</div>
    <div v-else>
      <div class="overflow-x-scroll p-4 rounded-xl border">
        <vue-json-pretty :data="apiResult.data?.data" :deep="3" show-length />
      </div>
      <DownloadSection
        :dataset="apiResult.data?.data"
        :dataset-url="datasetUrl"
        hide-csv
      />
    </div>
  </ContentAlignmentX>
</template>

<script lang="ts">
import { ref, UnwrapRef } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import VueJsonPretty from 'vue-json-pretty';
import axios, { AxiosResponse } from 'axios';
import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';
import { useApi } from '../../api/client';
import { getApiConfigForDataset } from '../../api/configUtils';

export default defineComponent({
  components: {
    DownloadSection,
    ContentAlignmentX,
    VueJsonPretty,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType as string;
    const datasetId = route.params.datasetId as string;
    let datasetUrl = '';

    const apiResult = ref<
      UnwrapRef<UseQueryReturnType<AxiosResponse<any, any>, Error>>
    >({} as any);

    const fetchList = async (url: string) => {
      const fetcher = async ({ queryKey }: { queryKey: unknown[] }) => {
        return await axios.get(queryKey[0] as string);
      };
      const result = useApi(url, fetcher as unknown as any);
      apiResult.value = result as any;
    };

    const configEntry = getApiConfigForDataset(datasetType);
    if (configEntry?.detailEndpoint?.url != null) {
      datasetUrl = configEntry.detailEndpoint.url.replace('{id}', datasetId);
      fetchList(datasetUrl);
    }
    return {
      datasetType,
      datasetId,
      datasetUrl: datasetUrl,
      apiResult,
      fetchList,
    };
  },
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
