<template>
  <ContentAlignmentX>
    <section v-if="isError" class="bg-red-200">
      <h2>Got error from API</h2>
      <div>{{ viewConfigError }}</div>
    </section>
    <section v-if="isSuccess" class="flex flex-col">
      <TableNavigation
        :page-size-options="pageSizeOptions"
        :pagination="pagination"
        class="hidden md:flex"
        @paginate-to="paginateTo"
        @page-size-changes="pageSizeChanges"
      />

      <TableContent :render-elements="renderConfig.elements" :rows="rows" />

      <TableNavigation
        :page-size-options="pageSizeOptions"
        :pagination="pagination"
        @paginate-to="paginateTo"
        @page-size-changes="pageSizeChanges"
      />

      <DownloadSection v-if="data" :dataset="data" :dataset-url="url" />
    </section>
    <section v-if="viewConfigError != null">
      {{ viewConfigError }}
    </section>
    <section v-if="error != null">
      {{ error }}
    </section>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';
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
import { useApiQuery } from '../../api/service/apiQueryHandler';
import { useApiForViewConfig } from '../../api/client/client';
import { stringifyParameter } from '../../api/service/query';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import { ListRenderConfig, ViewConfig } from '../../viewConfig/types';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const viewConfigError = computed<string | null>(() =>
  viewConfig.value.renderConfig.type === 'list'
    ? null
    : 'View configuration for table contains no table configuration'
);

const renderConfig = computed(
  () => viewConfig.value.renderConfig as ListRenderConfig
);

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

// Define result mapping function
const resultMapper = (data: AxiosResponse): PaginationData => {
  const defaultApiParameters = apiQuery.defaultApiParameters.value;
  const currentApiParameters = apiQuery.currentApiParameters.value;
  return unifyPagination(data, {
    defaultParameters: defaultApiParameters,
    parameters: currentApiParameters,
  });
};

const { isError, isSuccess, data, error, url } = useApiForViewConfig(
  viewConfig,
  resultMapper
);

// Define method to change page
const paginateTo = (page: string) =>
  apiQuery.updateApiParameterValue('pagenumber', page);

// Handle page size
const pageSize = apiQuery.useApiParameter('pagesize');

const pageSizeChanges = (value: string | undefined) => (pageSize.value = value);

const rows = computed(() => (data.value as PaginationData)?.items ?? []);

const pagination = computed(() => (data.value as PaginationData)?.pagination);
</script>
