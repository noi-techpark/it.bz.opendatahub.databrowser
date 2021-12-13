<template>
  <AppLayout>
    <ContentArea>
      <ViewPills
        :view="view"
        :dataset-type="datasetType"
        :dataset-id="datasetId"
      />
      <div>
        Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
        {{ $route.params.datasetId }})
      </div>
      <div class="overflow-x-scroll p-4 rounded-xl border">
        <div v-if="apiResult.isFetching">Loading</div>
        <div v-else>
          <vue-json-pretty :data="apiResult.data?.data" :deep="3" show-length />
        </div>
      </div>
    </ContentArea>
  </AppLayout>
</template>

<script lang="ts">
import { ref, UnwrapRef } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import AppLayout from '../../layouts/AppLayout.vue';
import { useApi } from '../../domain/api/client';
import { useRoute } from 'vue-router';
import { apiConfigProvider } from '../../domain/api/configUtils';
import ContentArea from '../../components/content/ContentArea.vue';
import VueJsonPretty from 'vue-json-pretty';
import axios, { AxiosResponse } from 'axios';
import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import ViewPills from '../../domain/datasets/navigation/ViewPills.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';

export default defineComponent({
  components: {
    ViewPills,
    AppLayout,
    ContentArea,
    VueJsonPretty,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType as string;
    const datasetId = route.params.datasetId as string;

    const apiResult = ref<
      UnwrapRef<UseQueryReturnType<AxiosResponse<any, any>, Error>>
    >({} as any);

    const fetchList = async (url: string, id: string) => {
      const fetcher = async ({ queryKey }: { queryKey: unknown[] }) => {
        return await axios.get(queryKey[0] as string);
      };
      const result = useApi(url.replace('{id}', id), fetcher as unknown as any);
      apiResult.value = result as any;
    };

    const configEntry = apiConfigProvider(datasetType);
    if (configEntry?.detailEndpoint?.url != null) {
      fetchList(configEntry.detailEndpoint.url, datasetId);
    }
    return {
      view: ViewPill.raw,
      datasetType,
      datasetId,
      apiResult,
      fetchList,
    };
  },
  methods: {
    getEntryValue(entry: unknown) {
      return typeof entry == 'object' ? JSON.stringify(entry, null, 4) : entry;
    },
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
