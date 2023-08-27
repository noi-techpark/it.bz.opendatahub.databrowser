// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { useApiReadForCurrentDataset } from '../../../api';
import { defaultTablePagination } from '../defaultValues';
import { useDatasetConfigStore } from '../../../datasetConfig/datasetConfigStore';
import { tableViewDomainBasedSettingsStore } from '../tableViewDomainBasedSettingsStore';
import { storeToRefs } from 'pinia';
import { useTableViewColsStore } from '../tableViewColsStore';
// import { useTableViewColsStore } from '../tableViewColsStore';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const useTableLoad = () => {
  const { dataMapper } = tableViewDomainBasedSettingsStore();

  // Use api read
  const { isError, isStartOrFetch, data, error, url } =
    useApiReadForCurrentDataset({ resultMapper: dataMapper });

  // If there are no items yet (e.g. because of initial load),
  // show a fallback table with empty rows
  const rows = computed(() =>
    isStartOrFetch.value
      ? buildFallbackRows(data.value?.pagination.pageSize ?? 25)
      : data.value?.items ?? []
  );

  // Get dataset config
  const { editRecordSupported, hasDetailView, hasQuickView, isResolving } =
    storeToRefs(useDatasetConfigStore());

  // Get table columns from dataset config
  const { cols } = storeToRefs(useTableViewColsStore());

  const isLoading = computed(() => isStartOrFetch.value || isResolving.value);

  // Handle pagination
  const pagination = computed(
    () => data.value?.pagination ?? defaultTablePagination
  );

  return {
    cols,
    rows,
    pagination,
    isLoading,
    isError,
    error,
    hasDetailView,
    hasQuickView,
    editRecordSupported,
    url,
  };
};
