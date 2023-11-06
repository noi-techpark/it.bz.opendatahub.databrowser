// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed } from 'vue';
// import { stringifyParameter, useApiParameterHandler } from '../../../api';
import { SortState } from './types';
import { useApiParameterStore } from '../../../api/service/apiParameterStore';
import { storeToRefs } from 'pinia';
import { PropertyPath } from '../../../datasetConfig/types';

// This function computes the rawsort value based on the sort field and the sort state.
const rawsortValue = (propertyPath: PropertyPath, sortState: SortState) => {
  switch (sortState) {
    case 'none':
      return undefined;
    case 'asc':
      return propertyPath;
    case 'desc':
      return `-${propertyPath}`;
  }
};

export const useTableSortForPropertyPath = (
  propertyPath: Ref<string | undefined>
) => {
  // The sortFromUrl property contains the current sort value from the URL (may be undefined).
  // const sortFromUrl = useApiParameterHandler().useApiParameter('rawsort');
  const { currentApiParams } = storeToRefs(useApiParameterStore());
  // const sortFromUrl = computed(())

  // The currentSortState property contains the current sort state for the given field.
  // It is 'none' if the URL contains no sort information or the the given field is not the
  // current sort field. It is 'asc' if the URL contains the sort field without a leading '-'
  // and 'desc' if the URL contains the sort field with a leading '-'.
  const currentSortState = computed(() => {
    const sortFromUrl = currentApiParams.value['rawsort'];
    // If the no sort is set in the URL, the current sort state is 'none'.
    if (sortFromUrl == null) {
      return 'none';
    }

    // Convert the sort value from the URL to a string
    // const sortFromUrlAsString = stringifyParameter(sortFromUrl.value);
    const sortField = sortFromUrl.replace(/^-/, '');

    if (propertyPath.value !== sortField) {
      return 'none';
    }

    return sortFromUrl.startsWith('-') ? 'desc' : 'asc';
  });

  // The canSort property is true if the given field can be sorted.
  const canSort = computed(() => propertyPath.value != null);

  const isCurrentSortAsc = computed(() => currentSortState.value === 'asc');

  const isCurrentSortDesc = computed(() => currentSortState.value === 'desc');

  // Set the current sort state.
  const setSort = (sortState: SortState) => {
    if (propertyPath.value == null) {
      return;
    }

    const rawsort = rawsortValue(propertyPath.value, sortState);
    if (rawsort != null) {
      currentApiParams.value['rawsort'] = rawsort;
    } else {
      delete currentApiParams.value['rawsort'];
    }
    // currentApiParams.value['rawsort'] = rawsortValue(field.value, sortState);
  };

  return {
    canSort,
    isCurrentSortAsc,
    isCurrentSortDesc,
    setSort,
  };
};
