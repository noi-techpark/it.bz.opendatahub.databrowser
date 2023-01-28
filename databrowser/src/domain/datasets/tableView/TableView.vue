<template>
  <section class="flex flex-1 flex-col justify-start overflow-y-auto">
    <template v-if="isError">
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
      <div class="flex h-full overflow-y-auto">
        <div class="flex flex-1 flex-col overflow-y-auto">
          <TableContent
            :render-elements="elements"
            :rows="rows"
            :show-edit="
              datasetConfigStore.hasUpdatePermission &&
              !datasetConfigStore.isSourceGenerated
            "
            :show-quick="datasetConfigStore.hasQuickView"
          />
          <TableFooter
            :page-size="stringifyParameter(pageSize ?? '')"
            :pagination="pagination"
            @page-size-changes="pageSize = $event"
            @paginate-to="paginateTo"
          />
        </div>
        <SearchAndFilterToolbox :url="url" />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultQueryParameters, validPageSizes } from './defaultValues';
import TableContent from './TableContent.vue';
import { AxiosResponse } from 'axios';
import {
  PaginationData,
  stringifyParameter,
  unifyPagination,
  useApiReadForCurrentDataset,
  useApiQuery,
} from '../../api';
import TableFooter from './TableFooter.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import ShowApiError from '../../api/components/ShowApiError.vue';
import { useI18n } from 'vue-i18n';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import SearchAndFilterToolbox from './SearchAndFilterToolbox.vue';

const { t } = useI18n();

// API query is used in several places
const {
  currentApiParameters,
  defaultApiParameters,
  setDefaultApiParameters,
  updateApiParameterValidator,
  updateApiParameterValue,
  useApiParameter,
} = useApiQuery();

setDefaultApiParameters(defaultQueryParameters);
updateApiParameterValidator('pagesize', (value) =>
  validPageSizes.includes(stringifyParameter(value))
);
updateApiParameterValidator(
  'pagenumber',
  (value) => parseInt(stringifyParameter(value), 10) > 0
);

// Define result mapping function
const resultMapper = (data: AxiosResponse): PaginationData => {
  const defaultParameters = defaultApiParameters.value;
  const parameters = currentApiParameters.value;
  return unifyPagination(data, { defaultParameters, parameters });
};

const datasetConfigStore = useDatasetConfigStore();

const elements = computed(() => datasetConfigStore.tableView?.elements ?? []);

const { isError, isSuccess, isLoading, data, error, url } =
  useApiReadForCurrentDataset({ resultMapper });

// Define method to change page
const paginateTo = (page: string) =>
  updateApiParameterValue('pagenumber', page);

// Handle page size
const pageSize = useApiParameter('pagesize');

const rows = computed(() => (data.value as PaginationData).items ?? []);

const pagination = computed(() => (data.value as PaginationData).pagination);
</script>
