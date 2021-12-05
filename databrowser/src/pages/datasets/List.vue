<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="lg:px-0 pt-10 pb-8 lg:pb-10 mx-auto w-full max-w-5xl">
    <div class="flex justify-end items-center">
      <span v-t="'datasets.listView.linesPerPage'" class="block mr-3"></span>
      <select v-model="pageSize" class="mr-8">
        <option
          v-for="option in pageSizeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <Paginator :pagination="pagination" @paginate-to="paginateTo" />
    </div>

    <div v-if="isSuccess" class="overflow-auto pt-6">
      <DataTable :config="tableConfig" :rows="rows" />
    </div>

    <div v-if="tableConfig == null">
      Config was not found, ID = {{ $route.params.datasetType }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { apiConfigProvider } from '../../domain/api/configUtils';
import DataTable from '../../components/dataTable/DataTable.vue';
import '../../domain/customElements/webComponentImport';
import Paginator from '../../components/paginator/Paginator.vue';
import { Pagination } from '../../domain/api/types';
import { useApi } from '../../domain/api/client';
import { useUrlQueryRouter } from '../../lib/urlQuery/urlQueryRouter';
import { useUrlQueryParameter } from '../../lib/urlQuery/urlQueryParameter';
import { defaultQueryParameters, pageSizeOptions } from './defaultValues';
import { buildListApiFetcher } from '../../domain/api/fetcher/list';
import { useListMapper } from '../../domain/api/mapper';

export default defineComponent({
  components: { DataTable, Paginator },
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

    const pageSize = useUrlQueryParameter('pagesize', '25', {
      defaultValue: '25',
    });

    const { isFetching, isSuccess } = toRefs(result);

    return {
      isFetching,
      isSuccess,
      pageSize,
      pageSizeOptions,
      paginatedData,
      tableConfig,
      paginateTo,
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
