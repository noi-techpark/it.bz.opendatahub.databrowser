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

    <DownloadSection v-if="url && data" :dataset="data" :dataset-url="url" />
  </section>
  <section v-if="tableConfig == null">
    Config was not found, ID = {{ $route.params.datasetType }}
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getApiConfigForDataset } from '../../api/configUtils';
import { defaultQueryParameters, pageSizeOptions } from './defaultValues';
import { unifyPagination } from '../../api/mapper';
import TableContent from './TableContent.vue';
import TableNavigation from './TableNavigation.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';
import { PaginationData } from '../../api/types';
import { AxiosResponse } from 'axios';
import { useAxiosFetcher } from '../../api/fetcher/axios';
import { useApiQuery } from '../../../lib/apiQuery/apiQueryHandler';
import { useApi } from '../../api/client';
import { useUrl } from '../../api/query/url';
import { useApiParameter } from '../../../lib/apiQuery/apiParameter';

export default defineComponent({
  components: { DownloadSection, TableContent, TableNavigation },
  setup() {
    // Use path parameters to get config for dataset
    const route = useRoute();
    const datasetType = route.params.datasetType as string;

    // Get config parameters
    const { url, tableConfig } =
      getApiConfigForDataset(datasetType)?.listEndpoint ?? {};

    // API query is used in several places
    const apiQuery = useApiQuery();

    // Get reactive fetch url
    const fetchUrl = useUrl(url);

    // Get fetcher function
    const fetcher = useAxiosFetcher();

    // Define result mapping function
    const resultMapper = (data: AxiosResponse): PaginationData => {
      const queryParameters = apiQuery.currentQueryParameters.value;
      return unifyPagination(data.data, {
        defaultQueryParameters,
        queryParameters,
      });
    };

    // Fetch data
    const { data, isSuccess } = useApi(fetchUrl, fetcher, {
      select: resultMapper,
    });

    // Define method to change page
    const paginateTo = (page: number) =>
      apiQuery.updateQueryParameterValue('pagenumber', page.toString());

    // Handle page size
    const pageSize = useApiParameter('pagesize', {
      defaultValue: '25',
    });

    const pageSizeChanges = (value: string | undefined) =>
      (pageSize.value = value);

    const rows = computed(() => data.value?.items ?? []);

    const pagination = computed(() => data.value?.pagination);

    return {
      url,
      isSuccess,
      pageSizeOptions,
      data,
      tableConfig,
      rows,
      pagination,
      paginateTo,
      pageSizeChanges,
    };
  },
});
</script>
