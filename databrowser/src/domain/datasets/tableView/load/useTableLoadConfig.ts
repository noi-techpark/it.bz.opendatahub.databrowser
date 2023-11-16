// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useComputePaginationWithRouter } from '../../../api/pagination/computePagination';
import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';

export const useTableLoadConfig = () => {
  const {
    isResolving,
    view,
    fullPath,
    hasDetailView,
    hasQuickView,
    datasetDomain,
    datasetQuery,
    editRecordSupported,
  } = storeToRefs(useDatasetInfoStore());

  const query = computed(() => datasetQuery.value?.stringParts);

  const paginationProvider = useComputePaginationWithRouter(
    datasetDomain,
    query
  );

  return {
    isConfigLoading: isResolving,
    view,
    fullPath,
    hasDetailView,
    hasQuickView,
    editRecordSupported,
    paginationProvider,
  };
};
