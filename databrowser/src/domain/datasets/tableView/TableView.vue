<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section v-if="isSuccess" class="flex flex-col">
    <TableNavigation
      :page-size-options="pageSizeOptions"
      :pagination="pagination"
      class="hidden md:flex"
      @paginate-to="paginateTo"
      @page-size-changes="pageSizeChanges"
    />

    <TableContent :config="tableConfig" :rows="rows" />

    <TableNavigation
      :page-size-options="pageSizeOptions"
      :pagination="pagination"
      @paginate-to="paginateTo"
      @page-size-changes="pageSizeChanges"
    />

    <DownloadSection
      v-if="url && paginatedData"
      :dataset="paginatedData"
      :dataset-url="url"
    />
  </section>
  <section v-if="tableConfig == null">
    Config was not found, ID = {{ $route.params.datasetType }}
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { computed, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { getApiConfigForDataset } from '../../api/configUtils';
import { useApi } from '../../api/client';
import { useUrlQueryRouter } from '../../../lib/urlQuery/urlQueryRouter';
import { useUrlQueryParameter } from '../../../lib/urlQuery/urlQueryParameter';
import { defaultQueryParameters, pageSizeOptions } from './defaultValues';
import { buildListApiFetcher } from '../../api/fetcher/list';
import { useListMapper } from '../../api/mapper';
import TableContent from './TableContent.vue';
import TableNavigation from './TableNavigation.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';

export default defineComponent({
  components: { DownloadSection, TableContent, TableNavigation },
  setup() {
    // Use path parameters to get config for dataset
    const route = useRoute();
    const datasetType = route.params.datasetType as string;

    // Get config parameters
    const { url, tableConfig } =
      getApiConfigForDataset(datasetType)?.listEndpoint ?? {};

    // Use query router for URL query parameter handling
    // TODO: one could use the info from OpenAPI to get the default query parameters
    // of the current endpoint
    const routerQuery = useUrlQueryRouter({ defaultQueryParameters });
    const { queryParameters } = toRefs(routerQuery);

    // Define reactive queryKey for useApi. If any parts of the queryKey
    // changes, data will be fetched with the now current parameters.
    const queryKey = reactive([
      `list: ${datasetType}`,
      {
        url,
        queryParameters,
      },
    ]);

    // Define fetch strategy
    const fetcher = buildListApiFetcher({ defaultQueryParameters });

    // Fetch API
    const result = useApi(queryKey, fetcher);
    const { isFetching, isSuccess } = toRefs(reactive(result));

    // Map API result
    const paginatedData = useListMapper(
      result.data,
      reactive({
        defaultQueryParameters,
        queryParameters,
      })
    );

    // Define method to change page
    const paginateTo = (page: number) =>
      routerQuery.actions.updateQuery({ pagenumber: page.toString() });

    // Handle page size
    const pageSize = useUrlQueryParameter('pagesize', '25', {
      defaultValue: '25',
    });

    const pageSizeChanges = (value: string | undefined) =>
      (pageSize.value = value);

    const rows = computed(() => paginatedData.value?.items ?? []);

    const pagination = computed(() => paginatedData.value?.pagination);

    return {
      url,
      isFetching,
      isSuccess,
      pageSizeOptions,
      paginatedData,
      tableConfig,
      rows,
      pagination,
      paginateTo,
      pageSizeChanges,
    };
  },
});
</script>
