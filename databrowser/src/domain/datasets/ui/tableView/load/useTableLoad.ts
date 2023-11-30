// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePagination } from '../../../../data/pagination/usePagination';
import { useDatasetBaseInfoStore } from '../../../config/store/datasetBaseInfoStore';
import { updateDatasetLocationStore } from '../../../location/store/utils';
import { useDatasetPermissionStore } from '../../../permission/store/datasetPermissionStore';
import { useDatasetViewStore } from '../../../view/store/datasetViewStore';
import { useTableCols } from './tableCols';
import { useTableRows } from './tableRows';
import { useTableLoadData } from './useTableLoadData';

export const useTableLoad = () => {
  // Use base dataset info
  const {
    isLoading: isConfigLoading,
    datasetDomain,
    datasetPath,
    datasetQuery,
    fullPath,
  } = storeToRefs(useDatasetBaseInfoStore());

  // Load table data
  const { isDataLoading, isError, error, data, responseData } =
    useTableLoadData(fullPath);

  updateDatasetLocationStore(datasetDomain, datasetPath, datasetQuery, data);

  // Compute loading state
  const isLoading = computed(
    () => isConfigLoading.value || isDataLoading.value
  );

  // Use view info
  const { view, hasDetailView, hasQuickView } = storeToRefs(
    useDatasetViewStore()
  );

  // Compute table cols
  const cols = useTableCols(isLoading, view);

  // Compute table rows
  const rows = useTableRows(isDataLoading, data);

  // Compute pagination
  const pagination = usePagination(datasetDomain, datasetQuery, responseData);

  // Use permissions
  const { editRecordSupported } = storeToRefs(useDatasetPermissionStore());

  return {
    isLoading,
    cols,
    rows,
    pagination,
    datasetDomain,
    fullPath,
    isError,
    error,
    hasDetailView,
    hasQuickView,
    editRecordSupported,
  };
};
