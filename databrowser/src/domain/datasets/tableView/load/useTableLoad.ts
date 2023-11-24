// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { useTableLoadConfig } from './useTableLoadConfig';
import { useTableCols } from './tableCols';
import { useTableRows } from './tableRows';
import { useDataStore } from '../../../data/load/useDataStore';
import { storeToRefs } from 'pinia';

export const useTableLoad = () => {
  // Load table config
  const {
    fullPath,
    view,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isConfigLoading,
  } = useTableLoadConfig();

  // Load table data
  const {
    isLoading: isDataLoading,
    isError,
    error,
    data,
  } = storeToRefs(useDataStore());

  // Compute loading state
  const isLoading = computed(
    () => isConfigLoading.value || isDataLoading.value
  );

  // Compute table cols
  const cols = useTableCols(isLoading, view);

  // Compute table rows
  const rows = useTableRows(isDataLoading, data);

  return {
    isLoading,
    cols,
    rows,
    fullPath,
    editRecordSupported,
    hasDetailView,
    hasQuickView,
    isError,
    error,
  };
};
