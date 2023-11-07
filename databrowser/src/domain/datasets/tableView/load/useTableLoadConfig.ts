// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';
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
  } = storeToRefs(useDatasetInfoStore());

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
