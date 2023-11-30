// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDatasetBaseInfoStore } from '../../config/store/datasetBaseInfoStore';
import { DatasetPath, DatasetQuery } from '../../config/types';
import { computeDatasetViewLocations } from '../../location/datasetViewLocation';

export const useTableRowSelection = (rows: Ref<unknown[]>) => {
  const { datasetDomain, datasetPath, datasetQuery } = storeToRefs(
    useDatasetBaseInfoStore()
  );

  // Handle row selection
  const selectedRowIndex = ref<number | undefined>();
  const rowClicked = (index: number) => (selectedRowIndex.value = index);

  // Handle double click
  const router = useRouter();
  const rowDblClicked = (row: unknown) => {
    const { detailLocation } = computeDatasetViewLocations(
      datasetDomain.value,
      datasetPath.value as DatasetPath,
      datasetQuery.value?.raw as DatasetQuery['raw'],
      row
    );
    if (detailLocation != null) {
      router.push(detailLocation);
    }
  };

  // Watch changes in rows array and reset selectedRowIndex
  watch(
    () => rows.value,
    () => (selectedRowIndex.value = undefined)
  );

  return { selectedRowIndex, rowClicked, rowDblClicked };
};
