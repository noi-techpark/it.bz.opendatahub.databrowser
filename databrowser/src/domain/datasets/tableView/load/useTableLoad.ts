// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { useTableLoadConfig } from './useTableLoadConfig';
import { useTableCols } from './tableCols';
import { useTableRows } from './tableRows';
import { useLoadTableData } from './useTableLoadData';

export const useTableLoad = () => {
  // Load table config
  const {
    fullPath,
    view,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isConfigLoading,
    paginationProvider,
  } = useTableLoadConfig();

  // Load table data
  const { data, responseData, error, isError, isDataLoading } =
    useLoadTableData(fullPath);

  // Compute loading state
  const isLoading = computed(
    () => isConfigLoading.value || isDataLoading.value
  );

  // Compute pagination
  const pagination = computed(() =>
    paginationProvider.compute.value(responseData.value)
  );

  // Compute table cols
  const cols = useTableCols(isLoading, view);

  // Compute table rows
  const rows = useTableRows(isLoading, pagination, data, responseData);

  return {
    isLoading,
    cols,
    rows,
    fullPath,
    pagination,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isError,
    error,
  };
};
