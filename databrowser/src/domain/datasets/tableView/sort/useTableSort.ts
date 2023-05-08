import { Ref, computed, ref, watch } from 'vue';
import { stringifyParameter, useApiQuery } from '../../../api';
import { SortState } from './types';

// This function computes the rawsort value based on the sort field and the sort state.
const rawsortValue = (sortField: string, sortState: SortState) => {
  switch (sortState) {
    case 'none':
      return '';
    case 'asc':
      return sortField;
    case 'desc':
      return `-${sortField}`;
  }
};

export const useTableSortForField = (field: Ref<string | undefined>) => {
  const { useApiParameter } = useApiQuery();

  // The canSort property is true if there exists a field by which sorting can be performed.
  const canSort = computed(() => field.value != null);

  // The currentSortFromUrl property contains the current sort value from the URL (may be undefined).
  const currentSortFromUrl = useApiParameter('rawsort');

  // The currentSortMatchesSortField property is true if the current sort value from the URL matches
  // the sort field of this instance.
  const currentSortMatchesSortField = computed(() => {
    if (currentSortFromUrl.value == null) {
      return false;
    }
    const currentSortAsString = stringifyParameter(currentSortFromUrl.value);
    const currentSortField = currentSortAsString.replace(/^-/, '');
    return field.value === currentSortField;
  });

  // The currentSortState property contains the current sort state.
  const currentSortState = ref<SortState>('none');

  const isCurrentSortAsc = computed(() => currentSortState.value === 'asc');

  const isCurrentSortDesc = computed(() => currentSortState.value === 'desc');

  // Set the current sort state.
  const setSort = (sortState: SortState) => {
    if (field.value == null) {
      return;
    }

    currentSortState.value = sortState;

    // If the next sort state is 'none', we remove the rawsort parameter
    if (currentSortState.value === 'none') {
      currentSortFromUrl.value = undefined;
      return;
    }

    // Otherwise, we set the rawsort parameter to the current sort field
    const sortValue = rawsortValue(field.value, currentSortState.value);
    currentSortFromUrl.value = sortValue;
  };

  watch(
    currentSortMatchesSortField,
    (matching) => {
      if (!matching || currentSortFromUrl.value == null) {
        // If the current sort does not match the sort field, we reset the sort state.
        // The reason for this is that the sorted field might have changed, and we
        // want to reset the sort state in that case.
        currentSortState.value = 'none';
      } else {
        // Otherwise, we compute the current sort state from the current sort value.
        const currentSortAsString = stringifyParameter(
          currentSortFromUrl.value
        );
        currentSortState.value = currentSortAsString.startsWith('-')
          ? 'desc'
          : 'asc';
      }
    },
    { immediate: true }
  );

  return {
    canSort,
    isCurrentSortAsc,
    isCurrentSortDesc,
    setSort,
  };
};
