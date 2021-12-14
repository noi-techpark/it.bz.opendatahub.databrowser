<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="flex flex-col mx-auto lg:mt-8 w-full max-w-5xl min-h-0">
    <ListNavigation
      class="hidden md:flex"
      :pagination="pagination"
      :page-size-options="pageSizeOptions"
      @paginate-to="paginateTo"
      @page-size-changes="pageSizeChanges"
    />

    <div v-if="isSuccess" class="overflow-auto my-6">
      <DataTable :config="tableConfig" :rows="rows" />
    </div>

    <ListNavigation
      :pagination="pagination"
      :page-size-options="pageSizeOptions"
      @paginate-to="paginateTo"
      @page-size-changes="pageSizeChanges"
    />

    <div v-if="tableConfig == null">
      Config was not found, ID = {{ $route.params.datasetType }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { apiConfigProvider } from '../../api/configUtils';
import DataTable from '../../../components/dataTable/DataTable.vue';
import { Pagination } from '../../api/types';
import { useApi } from '../../api/client';
import { useUrlQueryRouter } from '../../../lib/urlQuery/urlQueryRouter';
import { useUrlQueryParameter } from '../../../lib/urlQuery/urlQueryParameter';
import { defaultQueryParameters, pageSizeOptions } from './defaultValues';
import { buildListApiFetcher } from '../../api/fetcher/list';
import { useListMapper } from '../../api/mapper';
import ListNavigation from './ListNavigation.vue';

export default defineComponent({
  components: { DataTable, ListNavigation },
  setup() {
    // Use path parameters to get config for dataset
    const route = useRoute();
    const datasetType = route.params.datasetType as string;

    // Get config parameters
    const { url, tableConfig } =
      apiConfigProvider(datasetType)?.listEndpoint ?? {};

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

    return {
      isFetching,
      isSuccess,
      pageSizeOptions,
      paginatedData,
      tableConfig,
      paginateTo,
      pageSizeChanges,
    };
  },
  computed: {
    rows(): unknown[] | undefined {
      return this.paginatedData?.items;
    },
    pagination(): Pagination | undefined {
      return this.paginatedData?.pagination;
    },
  },
});
</script>
