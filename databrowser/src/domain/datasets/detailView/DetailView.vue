<template>
  <h1>Dataset Detail Page (type = {{ datasetType }}, ID = {{ datasetId }})</h1>
  <div v-if="apiResult.isFetching">Loading</div>
  <div v-else>
    <DownloadSection
      :dataset="apiResult.data?.data"
      :dataset-url="datasetUrl"
      hide-csv
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { ref, UnwrapRef } from 'vue';
import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import { AxiosResponse } from 'axios';
import { getDataset, getDatasetUrl } from '../queryDataset';
import DownloadSection from '../../../components/download/DownloadSection.vue';

export default defineComponent({
  components: {
    DownloadSection,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType as string;
    const datasetId = route.params.datasetId as string;
    const apiResult = ref<
      UnwrapRef<UseQueryReturnType<AxiosResponse<any, any>, Error>>
    >({} as any);

    const datasetUrl = getDatasetUrl(datasetType, datasetId);
    apiResult.value = getDataset(datasetUrl) as never;

    return {
      datasetType,
      datasetId,
      datasetUrl,
      apiResult,
    };
  },
});
</script>
