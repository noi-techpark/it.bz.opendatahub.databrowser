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
      v-if="datasetUrlWithQuery && data"
      :dataset="data"
      :dataset-url="datasetUrlWithQuery"
    />
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
import {
  defaultQueryParameters,
  pageSizeOptions,
  validPageSizes,
} from './defaultValues';
import { unifyPagination } from '../../api/client/mapper';
import TableContent from './TableContent.vue';
import TableNavigation from './TableNavigation.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';
import { PaginationData } from '../../api/client/types';
import { AxiosResponse } from 'axios';
import { useAxiosFetcher } from '../../api/client/fetcher/axios';
import { useApiQuery } from '../../api/service/apiQueryHandler';
import { useApi, useAsQueryKey } from '../../api/client/client';
import { useUrlQuery } from '../../api/service/urlQueryHandler';
import { stringifyParameter } from '../../api/service/query';

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
    apiQuery.setDefaultApiParameters(defaultQueryParameters);
    apiQuery.updateApiParameterValidator('pagesize', (value) =>
      validPageSizes.includes(stringifyParameter(value))
    );
    apiQuery.updateApiParameterValidator(
      'pagenumber',
      (value) => parseInt(stringifyParameter(value), 10) > 0
    );

    const datasetUrlWithQuery = useUrlQuery().useUrlWithQueryParameters(url);
    const fetchUrl = useAsQueryKey(datasetUrlWithQuery);

    // Get fetcher function
    const fetcher = useAxiosFetcher();

    // Define result mapping function
    const resultMapper = (data: AxiosResponse): PaginationData => {
      const defaultApiParameters = apiQuery.defaultApiParameters.value;
      const currentApiParameters = apiQuery.currentApiParameters.value;
      return unifyPagination(data.data, {
        defaultParameters: defaultApiParameters,
        parameters: currentApiParameters,
      });
    };

    // Fetch data
    const { data, isSuccess } = useApi(fetchUrl, fetcher, {
      select: resultMapper,
    });

    // Define method to change page
    const paginateTo = (page: number) =>
      apiQuery.updateApiParameterValue('pagenumber', page.toString());

    // Handle page size
    const pageSize = apiQuery.useApiParameter('pagesize');

    const pageSizeChanges = (value: string | undefined) =>
      (pageSize.value = value);

    const rows = computed(() => data.value?.items ?? []);

    const pagination = computed(() => data.value?.pagination);

    return {
      datasetUrlWithQuery,
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
