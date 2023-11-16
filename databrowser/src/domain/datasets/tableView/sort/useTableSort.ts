// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed } from 'vue';
import { SortState } from './types';
import { storeToRefs } from 'pinia';
import { PropertyPath } from '../../../datasetConfig/types';
import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';
import { useRouter } from 'vue-router';

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
  const { datasetQuery } = storeToRefs(useDatasetInfoStore());

  // The currentSortState property contains the current sort state for the given field.
  // It is 'none' if the URL contains no sort information or the the given field is not the
  // current sort field. It is 'asc' if the URL contains the sort field without a leading '-'
  // and 'desc' if the URL contains the sort field with a leading '-'.
  const currentSortState = computed(() => {
    const sortFromUrl = datasetQuery.value?.stringParts['rawsort'];
    // If the no sort is set in the URL, the current sort state is 'none'.
    if (sortFromUrl == null) {
      return 'none';
    }

    // Convert the sort value from the URL to a string
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

  const router = useRouter();

  // Set the current sort state.
  const setSort = (sortState: SortState) => {
    if (propertyPath.value == null) {
      return;
    }

    const rawsort = rawsortValue(propertyPath.value, sortState);

    const query = { ...router.currentRoute.value.query };

    if (rawsort != null) {
      query['rawsort'] = rawsort;
    } else {
      delete query['rawsort'];
    }

    router.push({ ...router.currentRoute.value, query });
  };

  return {
    canSort,
    isCurrentSortAsc,
    isCurrentSortDesc,
    setSort,
  };
};
