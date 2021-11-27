<template>
  <div class="p-4 my-2 bg-blue-100">
    Dataset List Page (type = {{ $route.params.datasetType }})
  </div>
  <div>fetching : {{ apiResult.isFetching }}</div>
  <div v-if="apiResult.isFetching">loading</div>
  <div v-else>
    <DataTable
      :config="configEntry.listEndpoint.table"
      :data="apiResult.data?.data"
    />
  </div>

  <div v-if="configEntry == null">
    Config was not found, ID = {{ $route.params.datasetType }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { ref, UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';
import { apiConfigProvider } from '../domain/api/configUtils';
import { GetApiSpecResult, useGetApiSpec } from '../domain/api/client';
import DataTable from '../components/dataTable/DataTable.vue';

import '../domain/customElements/webComponentImport';

interface SimpleApiInterface {
  Items: [];
}

export default defineComponent({
  components: { DataTable },
  setup() {
    const apiResult = ref<UnwrapRef<GetApiSpecResult<SimpleApiInterface>>>(
      // Need typecast because initial object is not of type GetApiSpecResult<SimpleApiInterface>.
      // It is not necessary to define the properties at this point.
      {} as any
    );
    const fetchList = async (url: string) => {
      const result = useGetApiSpec<SimpleApiInterface>(url);
      // Need type cast because we assign a reactive property
      // to a ref, which automagically unwraps all resulting refs and removes
      // nested "value" properties.
      // Example: result.data.value.config.XYZ becomes apiResult.value.data.config.XYZ
      apiResult.value = result as unknown as UnwrapRef<
        GetApiSpecResult<SimpleApiInterface>
      >;
    };
    // Use path parameters to get config for dataset
    const route = useRoute();
    const configEntry = apiConfigProvider(route.params.datasetType as string);
    // Load dataset from remote if config was found
    if (configEntry != null) {
      fetchList(configEntry.listEndpoint.path);
    }
    return {
      apiResult,
      configEntry,
      fetchList,
    };
  },
});
</script>
