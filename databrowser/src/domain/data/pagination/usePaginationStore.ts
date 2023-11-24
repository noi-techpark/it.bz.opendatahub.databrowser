// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { usePagination } from './usePagination';
import { useDataStore } from '../load/useDataStore';
import { computed } from 'vue';

export const usePaginationStore = defineStore('paginationStore', () => {
  const {
    datasetDomain,
    datasetQuery,
    isLoading: isInfoLoading,
  } = storeToRefs(useDatasetInfoStore());

  const { responseData, isLoading: isDataLoading } = storeToRefs(
    useDataStore()
  );

  const isLoading = computed(() => isInfoLoading.value || isDataLoading.value);

  const pagination = usePagination(datasetDomain, datasetQuery, responseData);

  return { pagination, isLoading };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaginationStore, import.meta.hot));
}
