import { Ref, computed, ref, watch } from 'vue';
import {
  stringifyParameter,
  useApiQuery,
  useReplaceWithApiParameters,
} from '../../domain/api';

type SortState = 'none' | 'asc' | 'desc';

// This function computes the next sort state based on the current sort state.
const nextSortState = (sortState: SortState) => {
  switch (sortState) {
    case 'none':
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return 'none';
  }
};

// This function computes the rawsort value based on the filter field and the filter state.
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

export const useTableSort = (fields: Ref<Record<string, string>>) => {
  const { useApiParameter } = useApiQuery();

  // The sortField property contains the field name that is used to sort.
  // At the moment, sorting works only if there is exactly one field.
  const { replace } = useReplaceWithApiParameters();
  const sortField = computed(() => {
    const values = Object.values(fields.value);
    return values.length === 1 ? replace(values[0]) : undefined;
  });

  // The hasSortField property is true if there exists a field by which sorting can be performed.
  const hasSortField = computed(() => sortField.value != null);

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
    return sortField.value === currentSortField;
  });

  // The currentSortState property contains the current sort state.
  const currentSortState = ref<SortState>('none');

  // This function is called when the user clicks the sort button.
  const toggleSort = () => {
    // If there is no sort field, we can't toggle the sort
    if (sortField.value == null) {
      return;
    }

    // Compute the next sort state
    currentSortState.value = nextSortState(currentSortState.value);

    // If the next sort state is 'none', we remove the rawsort parameter
    if (currentSortState.value === 'none') {
      currentSortFromUrl.value = undefined;
      return;
    }

    // Otherwise, we set the rawsort parameter to the current sort field
    const sortValue = rawsortValue(sortField.value, currentSortState.value);
    currentSortFromUrl.value = sortValue;
  };

  // If the current sort does not match the sort field, we reset the sort state.
  // The reason for this is that the sorted field might have changed, and we
  // want to reset the sort state in that case.
  watch(currentSortMatchesSortField, (matching) => {
    if (!matching) {
      currentSortState.value = 'none';
    }
  });

  return {
    currentSortState,
    currentSortMatchesSortField,
    hasSortField,
    toggleSort,
  };
};
