// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePathsForCurrentRoute } from '../header/usePaths';
import { rowId } from './utils';

export const useTableRowSelection = (rows: Ref<unknown[]>) => {
  const { detailViewPathForId } = usePathsForCurrentRoute();

  // Handle row selection
  const selectedRowIndex = ref<number | undefined>();
  const rowClicked = (index: number) => (selectedRowIndex.value = index);

  // Handle double click
  const router = useRouter();
  const rowDblClicked = (row: unknown) => {
    if (row == null) {
      return;
    }
    const id = rowId(row);
    if (id == null) {
      return;
    }
    router.push(detailViewPathForId(id).value);
  };

  // Watch changes in rows array and reset selectedRowIndex
  watch(
    () => rows.value,
    () => (selectedRowIndex.value = undefined)
  );

  return { selectedRowIndex, rowClicked, rowDblClicked };
};
