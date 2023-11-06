// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { Ref, computed, toRefs, watch } from 'vue';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';
import { useTableViewColsStore } from '../tableViewColsStore';
import { useRawfilterHandler } from './rawfilterHandler';
import { useTableFilterStore } from './tableFilterStore';
import { Filter, FilterOperator, FilterValue, Rawfilter } from './types';
import { ListElements, PropertyPath } from '../../../datasetConfig/types';

type TableViewColumn = ListElements & {
  title: string;
  // Defined if there is exactly one entry in propertyMappings
  propertyMapping?: string;
};

let isValueChange = false;

export const useTableFilterForPropertyPath = (
  title: Ref<string>,
  propertyPath: Ref<PropertyPath | undefined>
) => {
  // Access rawfilters from URL
  const { rawfilters, updateRawfilters } = useRawfilterHandler();

  // Get table columns from dataset config with placeholders replaced
  const { cols } = storeToRefs(useTableViewColsStore());

  // Filter store import
  const {
    addFilterByPropertyPath,
    removeFilterByPropertyPath,
    setFilters,
    filtersFromStore,
  } = useTableFilterStoreImport();

  // Update filters in store from rawfilters (URL)
  addFilterWatcherSingleton(rawfilters, cols, setFilters);

  // Add filter for current propertyPath to store and show toolbox
  const addFilter = () =>
    wrapFilterMutation(() => {
      if (propertyPath.value != null) {
        addFilterByPropertyPath(propertyPath.value, title.value);
        useToolBoxStore().visible = true;
      }
    });

  const removeFilter = () =>
    wrapFilterMutation(() => {
      removeFilterByPropertyPath(propertyPath.value);
      updateRawfilters(filtersFromStore.value);
    });

  // The canFilter property is true if there exists a propertyPath for which filtering can be performed.
  const canFilter = computed(() => propertyPath.value != null);

  const isFilterActive = computed(() => {
    if (propertyPath.value == null) {
      return false;
    }
    return (
      rawfilters.value.filter((f) => f.propertyPath === propertyPath.value)
        .length > 0
    );
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
  const { cols } = storeToRefs(useTableViewColsStore());

  // Filter store import
  const {
    addFilterByPropertyPath,
    removeFilterByIndex,
    setFilters,
    filtersFromStore,
  } = useTableFilterStoreImport();

  // Update filters in store from rawfilters (URL)
  addFilterWatcherSingleton(rawfilters, cols, setFilters);

  const addEmptyFilter = () =>
    wrapFilterMutation(() => {
      const colsWithoutNull = cols.value.find(
        (col): col is Required<TableViewColumn> => col.propertyPath != null
      );
      if (colsWithoutNull != null) {
        addFilterByPropertyPath(
          colsWithoutNull.propertyPath,
          colsWithoutNull.title
        );
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
    addFilterByPropertyPath,
    removeFilterByPropertyPath,
    removeFilterByIndex,
    setFilters,
  } = tableFilterStore;
  const { filters: filtersFromStore } = toRefs(tableFilterStore);

  return {
    addFilterByPropertyPath,
    removeFilterByPropertyPath,
    removeFilterByIndex,
    setFilters,
    filtersFromStore,
  };
};

let hasFilterWatcher = false;

const addFilterWatcherSingleton = (
  rawfilters: Ref<Rawfilter[]>,
  columns: Ref<TableViewColumn[]>,
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
          columns.value.find((col) => col.propertyPath === filter.propertyPath)
            ?.title ?? filter.propertyPath;
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
