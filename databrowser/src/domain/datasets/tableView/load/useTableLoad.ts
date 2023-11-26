// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { useTableLoadConfig } from './useTableLoadConfig';
import { useTableCols } from './tableCols';
import { useTableRows } from './tableRows';
import { usePagination } from '../../../data/pagination/usePagination';
import { updateDatasetLocationStore } from '../../location/store/utils';
import { useTableLoadData } from './useTableLoadData';

export const useTableLoad = () => {
  // Load table config
  const {
    fullPath,
    view,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isConfigLoading,
    datasetDomain,
    datasetPath,
    datasetQuery,
  } = useTableLoadConfig();

  // Load table data
  const { isDataLoading, isError, error, data, responseData } =
    useTableLoadData(fullPath);

  updateDatasetLocationStore(datasetDomain, datasetPath, datasetQuery, data);

  // Compute loading state
  const isLoading = computed(
    () => isConfigLoading.value || isDataLoading.value
  );

  // Compute table cols
  const cols = useTableCols(isLoading, view);

  // Compute table rows
  const rows = useTableRows(isDataLoading, data);

  // Compute pagination
  const pagination = usePagination(datasetDomain, datasetQuery, responseData);

  return {
    isLoading,
    cols,
    rows,
    pagination,
    fullPath,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isError,
    error,
  };
};
