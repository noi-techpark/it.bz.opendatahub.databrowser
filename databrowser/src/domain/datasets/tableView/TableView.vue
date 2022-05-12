<template>
  <section class="flex overflow-y-auto flex-col flex-1 justify-start">
    <template v-if="viewConfigError != null">
      <div class="bg-red-200">{{ viewConfigError }}</div>
    </template>
    <template v-else-if="isError">
      <ShowApiError :error="error" />
    </template>
    <template v-else-if="isLoading">
      <ContentAlignmentX>
        <div class="animate-pulse">
          {{ t('datasets.listView.loadingData') }}
        </div>
      </ContentAlignmentX>
    </template>
    <template v-else-if="isSuccess">
      <div class="flex overflow-y-auto">
        <TableContent :render-elements="renderConfig.elements" :rows="rows" />
        <ExportDatasetToolBox :url="url" :is-table-view="true" />
      </div>
      <TableFooter
        :pagination-options="paginationOptions"
        :pagination="pagination"
        @page-size-changes="pageSizeChanges"
        @paginate-to="paginateTo"
      />
    </template>
  </section>
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
import { PaginationData } from '../../api/client/types';
import { AxiosResponse } from 'axios';
import { useApiQuery } from '../../api/service/apiQueryHandler';
import { useApiForViewConfig } from '../../api/client/client';
import { stringifyParameter } from '../../api/service/query';
import { ListRenderConfig, ViewConfig } from '../../viewConfig/types';
import TableFooter from './TableFooter.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import ShowApiError from '../../api/components/ShowApiError.vue';
import ExportDatasetToolBox from '../toolbox/ExportDatasetToolBox.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const { isError, isSuccess, isLoading, data, error, url } = useApiForViewConfig(
  {
    viewConfig,
    resultMapper,
  }
);

// Define method to change page
const paginateTo = (page: string) =>
  apiQuery.updateApiParameterValue('pagenumber', page);

// Handle page size
const pageSize = apiQuery.useApiParameter('pagesize');

const pageSizeChanges = (value: string | undefined) => (pageSize.value = value);

const rows = computed(() => (data.value as PaginationData).items ?? []);

const pagination = computed(() => (data.value as PaginationData).pagination);

const paginationOptions = computed(
  () =>
    pageSizeOptions.map((pso) => ({
      ...pso,
      selected: pso.value === pageSize.value,
    })) ?? []
);
</script>
