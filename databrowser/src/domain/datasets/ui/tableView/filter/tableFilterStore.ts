// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineStore, storeToRefs } from 'pinia';
import { Ref, computed, ref, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import { PropertyPath } from '../../../config/types';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';
import { useTableViewColsStore } from '../tableViewColsStore';
import { useRawfilterHandler } from './rawfilterHandler';
import { Filter, FilterOperator, FilterValue } from './types';

export const useTableFilterStore = defineStore('tableFilterStore', () => {
  const filters = ref<Filter[]>([]);

  // Access rawfilters from URL
  const { rawfilters, updateRawfilters } = useRawfilterHandler();

  // Check if any filter is active
  const areFiltersActive = computed(() => rawfilters.value.length > 0);

  // Get table columns
  const { cols } = storeToRefs(useTableViewColsStore());

  // Create select options for filter column select
  const filterColSelectOptions = computed<SelectOption[]>(() =>
    cols.value.map<SelectOption>((col) => ({
      label: col.title,
      value: col.firstPropertyPath,
    }))
  );

  // Update filters if rawfilters or cols change
  watch([rawfilters, cols], () => {
    const filtersWithTitles = rawfilters.value.map((filter) => {
      const title =
        cols.value.find((col) => col.firstPropertyPath === filter.propertyPath)
          ?.title ?? filter.propertyPath;
      return { ...filter, title };
    });

    setFilters(filtersWithTitles);
  });

  // Add empty filter
  const addEmptyFilter = () => {
    // Find first column with firstPropertyPath set
    const colWithPropertyPath = cols.value.find(
      (col) => col.firstPropertyPath != null
    );
    // If such a column exists, add a filter for it
    if (colWithPropertyPath != null) {
      addFilterByPropertyPath(
        // We checked that firstPropertyPath is not null above, so we can use ! here
        colWithPropertyPath.firstPropertyPath!,
        colWithPropertyPath.title
      );
    }
  };

  // Add filter for a given propertyPath with default operator and value
  const addFilter = (title: string, propertyPath: PropertyPath | undefined) => {
    if (propertyPath != null) {
      addFilterByPropertyPath(propertyPath, title);
      // Show toolbox
      useToolBoxStore().visible = true;
    }
  };

  // Add filter for a given propertyPath with default operator and value
  const addFilterByPropertyPath = (propertyPath: string, title: string) => {
    filters.value = [
      ...filters.value,
      { propertyPath, title, operator: 'eq', value: '' },
    ];
  };

  // The canFilter function returns true if there exists a propertyPath for which filtering can be performed.
  const canFilter = (propertyPath: Ref<PropertyPath | undefined>) =>
    computed(() => propertyPath.value != null);

  // The isFilterActive function returns true if there exists a filter for the given propertyPath.
  const isFilterActive = (propertyPath: Ref<PropertyPath | undefined>) =>
    computed(() => {
      if (propertyPath.value == null) {
        return false;
      }
      return (
        rawfilters.value.filter((f) => f.propertyPath === propertyPath.value)
          .length > 0
      );
    });

  // Remove all filters
  const removeAllFilters = () => updateRawfilters([]);

  // Remove filter for a given propertyPath
  const removeFilterByPropertyPath = (propertyPath?: string) => {
    if (propertyPath != null) {
      filters.value = filters.value.filter(
        (filter) => filter.propertyPath !== propertyPath
      );
    }
  };

  // Remove filter by index
  const removeFilterByIndex = (index?: number) => {
    if (index != null) {
      filters.value = filters.value.filter((_, i) => i !== index);
    }
  };

  // Set all filters
  const setFilters = (nextFilters: Filter[]) => (filters.value = nextFilters);

  // Update filter value and, if applyFilter is true, apply filters to URL such that they take effect
  const updateFilterValue = (
    index: number,
    operator: FilterOperator,
    value: FilterValue,
    applyFilter = true
  ) => {
    const updatedFilters = filters.value.map((filter, i) =>
      i === index ? { ...filter, operator, value } : filter
    );

    setFilters(updatedFilters);

    // Apply filters to URL such that they take effect
    if (applyFilter) {
      updateRawfilters(filters.value);
    }
  };

  // Remove filter for a given propertyPath
  const removeFilter = (propertyPath: Ref<PropertyPath | undefined>) => {
    removeFilterByPropertyPath(propertyPath.value);
    updateRawfilters(filters.value);
  };

  return {
    areFiltersActive,
    filters,
    filterColSelectOptions,
    addEmptyFilter,
    addFilter,
    addFilterByPropertyPath,
    canFilter,
    isFilterActive,
    removeAllFilters,
    removeFilter,
    removeFilterByPropertyPath,
    removeFilterByIndex,
    setFilters,
    updateFilterValue,
  };
});
