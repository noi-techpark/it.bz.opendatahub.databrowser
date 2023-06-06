// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ComputedRef, Ref, computed, toRefs, watch } from 'vue';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';
import { useRawfilterHandler } from './rawfilterHandler';
import { useTableFilterStore } from './tableFilterStore';
import { Filter, FilterOperator, FilterValue, Rawfilter } from './types';
import {
  TableViewColumn,
  useTableViewColumns,
} from '../../../datasetConfig/utils';

interface Column {
  title: string;
  field?: string;
}

let isValueChange = false;

export const useTableFilterForField = (
  title: Ref<string>,
  field: Ref<string | undefined>
) => {
  // Access rawfilters from URL
  const { rawfilters, updateRawfilters } = useRawfilterHandler();

  // Get table columns from dataset config with placeholders replaced
  const columns = useTableViewColumns();

  // Filter store import
  const {
    addFilterByField,
    removeFilterByField,
    setFilters,
    filtersFromStore,
  } = useTableFilterStoreImport();

  // Update filters in store from rawfilters (URL)
  addFilterWatcherSingleton(rawfilters, columns, setFilters);

  // Add filter for current field to store and show toolbox
  const addFilter = () =>
    wrapFilterMutation(() => {
      if (field.value != null) {
        addFilterByField(field.value, title.value);
        useToolBoxStore().visible = true;
      }
    });

  const removeFilter = () =>
    wrapFilterMutation(() => {
      removeFilterByField(field.value);
      updateRawfilters(filtersFromStore.value);
    });

  // The canFilter property is true if there exists a field for which filtering can be performed.
  const canFilter = computed(() => field.value != null);

  const isFilterActive = computed(() => {
    if (field.value == null) {
      return false;
    }
    return rawfilters.value.filter((f) => f.field === field.value).length > 0;
  });

  return {
    canFilter,
    isFilterActive,
    addFilter,
    removeFilter,
  };
};

export const useTableFilter = () => {
  const { rawfilters, updateRawfilters } = useRawfilterHandler();

  // Get table columns from dataset config with placeholders replaced
  const columns = useTableViewColumns();

  // Filter store import
  const {
    addFilterByField,
    removeFilterByIndex,
    setFilters,
    filtersFromStore,
  } = useTableFilterStoreImport();

  // Update filters in store from rawfilters (URL)
  addFilterWatcherSingleton(rawfilters, columns, setFilters);

  const addEmptyFilter = () =>
    wrapFilterMutation(() => {
      const colsWithoutNull = columns.value.find(
        (col): col is Required<Column> => col.field != null
      );
      if (colsWithoutNull != null) {
        addFilterByField(colsWithoutNull.field, colsWithoutNull.title);
      }
    });

  const removeFilterByIndexInternal = (index: number) =>
    wrapFilterMutation(() => {
      removeFilterByIndex(index);
      updateRawfilters(filtersFromStore.value);
    });

  const updateFilterValue = (
    index: number,
    operator: FilterOperator,
    value: FilterValue
  ) =>
    wrapFilterMutation(() => {
      const updatedFilters = filtersFromStore.value.map((filter, i) =>
        i === index ? { ...filter, operator, value } : filter
      );

      setFilters(updatedFilters);
      updateRawfilters(filtersFromStore.value);
    });

  const removeAllFilters = () => updateRawfilters([]);

  const areFiltersActive = computed(() => rawfilters.value.length > 0);

  return {
    areFiltersActive,
    filtersFromStore,
    addEmptyFilter,
    removeAllFilters,
    removeFilterByIndex: removeFilterByIndexInternal,
    updateFilterValue,
  };
};

const useTableFilterStoreImport = () => {
  const tableFilterStore = useTableFilterStore();
  const {
    addFilterByField,
    removeFilterByField,
    removeFilterByIndex,
    setFilters,
  } = tableFilterStore;
  const { filters: filtersFromStore } = toRefs(tableFilterStore);

  return {
    addFilterByField,
    removeFilterByField,
    removeFilterByIndex,
    setFilters,
    filtersFromStore,
  };
};

let hasFilterWatcher = false;

const addFilterWatcherSingleton = (
  rawfilters: ComputedRef<Rawfilter[]>,
  columns: ComputedRef<TableViewColumn[]>,
  setFilters: (filters: Filter[]) => void
) => {
  if (hasFilterWatcher) {
    return;
  }

  watch(
    [rawfilters, columns],
    () => {
      if (isValueChange) {
        console.debug('isValueEmptyChange, aborting');
        return;
      }

      const filtersWithTitles = rawfilters.value.map((filter) => {
        const title =
          columns.value.find((col) => col.field === filter.field)?.title ??
          filter.field;
        return { ...filter, title };
      });

      setFilters(filtersWithTitles);
    },
    { immediate: true }
  );

  hasFilterWatcher = true;
};

// This is a workaround to temporarily prevent filter updates from URL
// (by rawfilters).
// The reason is, that filter updates update also the URL, which triggers
// the watcher above. This watcher then updates the filters in the store,
// removing all filters with empty values. This is not what we want.
// We want to keep the empty filters in the store, so that the user can
// add a value to the filter again.
const wrapFilterMutation = (fn: () => void) => {
  isValueChange = true;
  fn();
  setTimeout(() => (isValueChange = false), 50);
};
