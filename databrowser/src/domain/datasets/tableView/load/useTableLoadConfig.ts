// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDatasetConfigStore } from '../../../datasetConfig/store/datasetConfigStore';
import { storeToRefs } from 'pinia';
import { useComputePaginationWithRouter } from '../../../api/pagination/computePagination';

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
  } = storeToRefs(useDatasetConfigStore());

  const paginationProvider = useComputePaginationWithRouter(
    datasetDomain,
    datasetQuery
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
