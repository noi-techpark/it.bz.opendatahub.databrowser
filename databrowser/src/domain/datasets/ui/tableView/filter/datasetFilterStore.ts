// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useDatasetBaseInfoStore } from '../../../config/store/datasetBaseInfoStore';
import { useDatasetQueryStore } from '../../../location/store/datasetQueryStore';
import { buildFilterValuesString } from './builder/filterBuilder';
import { parseFilterWithRegex } from './parser/filterParser';
import { BaseFilter } from './types';

export const useDatasetFilterStore = defineStore('datasetFilterStore', () => {
  const { datasetDomain } = storeToRefs(useDatasetBaseInfoStore());

  const urlFilterParamName = computed(() => {
    if (datasetDomain.value === 'tourism') {
      return 'rawfilter';
    }
    if (datasetDomain.value === 'mobility') {
      return 'where';
    }
    return '';
  });

  const urlFilter = useDatasetQueryStore().handle(urlFilterParamName);

  const datasetFilters = computed<BaseFilter[]>({
    get: () => parseFilterWithRegex(datasetDomain.value, urlFilter.value),
    set: (updatedFilters) =>
      (urlFilter.value = buildFilterValuesString(
        datasetDomain.value,
        updatedFilters
      )),
  });

  return { datasetFilters };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetFilterStore, import.meta.hot)
  );
}
