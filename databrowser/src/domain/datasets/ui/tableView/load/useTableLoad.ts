// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDatasetBaseInfoStore } from '../../../config/store/datasetBaseInfoStore';
import { updateDatasetLocationStore } from '../../../location/store/utils';
import { useDatasetPermissionStore } from '../../../permission/store/datasetPermissionStore';
import { useDatasetViewStore } from '../../../view/store/datasetViewStore';
import { useTableCols } from './tableCols';
import { useTableRows } from './tableRows';
import { useTableLoadData } from './useTableLoadData';
import { randomId } from '../../../../../components/utils/random';

export const useTableLoad = () => {
  const router = useRouter();
  const { currentRoute } = router;

  // Use base dataset info
  const {
    isLoading: isConfigLoading,
    datasetDomain,
    datasetPath,
    datasetQuery,
    fullPath,
  } = storeToRefs(useDatasetBaseInfoStore());

  // Load table data
  const { isDataLoading, isError, error, data, pagination } = useTableLoadData(
    datasetDomain,
    datasetQuery,
    fullPath
  );

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

  // Compute table row ids and values
  const rows = useTableRows(datasetDomain, cols, data);

  // Use permissions
  const { editRecordSupported, deleteRecordSupported } = storeToRefs(
    useDatasetPermissionStore()
  );

  const refetch = () => {
    setTimeout(() =>
      router.replace({
        query: { ...currentRoute.value.query, refetchId: randomId() },
      })
    );
  };

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
    deleteRecordSupported,
    refetch,
  };
};
