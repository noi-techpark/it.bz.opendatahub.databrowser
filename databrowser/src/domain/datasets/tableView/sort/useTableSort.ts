// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed } from 'vue';
import { stringifyParameter, useApiParameterHandler } from '../../../api';
import { SortState } from './types';

// This function computes the rawsort value based on the sort field and the sort state.
const rawsortValue = (sortField: string, sortState: SortState) => {
  switch (sortState) {
    case 'none':
      return undefined;
    case 'asc':
      return sortField;
    case 'desc':
      return `-${sortField}`;
  }
};

export const useTableSortForField = (field: Ref<string | undefined>) => {
  // The sortFromUrl property contains the current sort value from the URL (may be undefined).
  const sortFromUrl = useApiParameterHandler().useApiParameter('rawsort');

  // The currentSortState property contains the current sort state for the given field.
  // It is 'none' if the URL contains no sort information or the the given field is not the
  // current sort field. It is 'asc' if the URL contains the sort field without a leading '-'
  // and 'desc' if the URL contains the sort field with a leading '-'.
  const currentSortState = computed(() => {
    // If the no sort is set in the URL, the current sort state is 'none'.
    if (sortFromUrl.value == null) {
      return 'none';
    }

    // Convert the sort value from the URL to a string
    const sortFromUrlAsString = stringifyParameter(sortFromUrl.value);
    const sortField = sortFromUrlAsString.replace(/^-/, '');

    if (field.value !== sortField) {
      return 'none';
    }

    return sortFromUrlAsString.startsWith('-') ? 'desc' : 'asc';
  });

  // The canSort property is true if the given field can be sorted.
  const canSort = computed(() => field.value != null);

  const isCurrentSortAsc = computed(() => currentSortState.value === 'asc');

  const isCurrentSortDesc = computed(() => currentSortState.value === 'desc');

  // Set the current sort state.
  const setSort = (sortState: SortState) => {
    if (field.value == null) {
      return;
    }

    sortFromUrl.value = rawsortValue(field.value, sortState);
  };

  return {
    canSort,
    isCurrentSortAsc,
    isCurrentSortDesc,
    setSort,
  };
};
