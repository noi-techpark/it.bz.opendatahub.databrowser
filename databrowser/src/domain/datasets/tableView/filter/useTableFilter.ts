import { Ref, computed, toRefs, watch } from 'vue';
import { replacePlaceholders, useApiParameterReplacements } from '../../../api';
import { useDatasetConfigStore } from '../../../datasetConfig/store/datasetConfigStore';
import { useToolboxStore } from '../../toolbox/toolboxStore';
import { useRawfilterHandler } from './rawfilterHandler';
import { useTableFilterStore } from './tableFilterStore';
import { FilterOperator, FilterValue } from './types';

interface Column {
  title: string;
  field?: string;
}

let isValueEmptyChange = false;

export const useTableFilter = (
  fields: Ref<Record<string, string>>,
  title: Ref<string>
) => {
  const { rawfilters, updateRawfilters } = useRawfilterHandler();

  //////////////////////////////////////////////////////////////
  // Get table columns from dataset config
  //////////////////////////////////////////////////////////////
  const datasetConfigStore = useDatasetConfigStore();
  const renderElements = computed(
    () => datasetConfigStore.tableView?.elements ?? []
  );

  const replacements = useApiParameterReplacements();
  const cols = computed<Column[]>(() => {
    const replace = (s: string): string =>
      replacePlaceholders(s, replacements.value);

    return renderElements.value.map((element) => {
      const values = Object.values(element.fields ?? {});
      const field = values.length === 1 ? replace(values[0]) : undefined;
      return { title: element.title, field };
    });
  });

  //////////////////////////////////////////////////////////////
  // Pinia store: import
  //////////////////////////////////////////////////////////////

  const tableFilterStore = useTableFilterStore();
  const { addFilter, removeFilterByField, removeFilterByIndex, setFilters } =
    tableFilterStore;
  const { filters: filtersFromStore } = toRefs(tableFilterStore);

  //////////////////////////////////////////////////////////////
  // Pinia store: update filters in store from rawfilters (URL)
  //////////////////////////////////////////////////////////////

  watch(
    [renderElements, rawfilters, cols],
    () => {
      if (isValueEmptyChange) {
        console.log('isValueEmptyChange, aborting');
        return;
      }

      // const filtersOrderedByTitles = rawfilters.value
      //   .slice()
      //   .sort(
      //     (a, b) =>
      //       cols.value.findIndex((col) => col.field === a.field) -
      //       cols.value.findIndex((col) => col.field === b.field)
      //   );
      const filtersWithTitles = rawfilters.value.map((filter) => {
        const title =
          cols.value.find((col) => col.field === filter.field)?.title ??
          filter.field;
        return { ...filter, title };
      });

      setFilters(filtersWithTitles);
    },
    { immediate: true }
  );

  //////////////////////////////////////////////////////////////
  // Handle field of this instance (instance related)
  //////////////////////////////////////////////////////////////

  // The fieldName property contains the field name that is used to filter.
  // At the moment, filtering works only if there is exactly one field.

  const fieldName = computed(() => {
    const replace = (s: string): string =>
      replacePlaceholders(s, replacements.value);
    const values = Object.values(fields.value);
    return values.length === 1 ? replace(values[0]) : undefined;
  });

  // The canFilter property is true if there exists a field for which filtering can be performed.
  const canFilter = computed(() => fieldName.value != null);

  const addFilterInternal = () => {
    if (fieldName.value != null) {
      addFilter(fieldName.value, title.value);
      useToolboxStore().visible = true;
    }
  };

  const removeFilterByFieldInternal = () => {
    removeFilterByField(fieldName.value);
    updateRawfilters(filtersFromStore.value);
  };

  const isFilterActive = computed(() => {
    if (fieldName.value == null) {
      return false;
    }
    return (
      rawfilters.value.filter((f) => f.field === fieldName.value).length > 0
    );
  });

  //////////////////////////////////////////////////////////////
  // Handle all fields
  //////////////////////////////////////////////////////////////

  const addEmptyFilter = () => {
    const colsWithoutNull = cols.value.find(
      (col): col is Required<Column> => col.field != null
    );
    if (colsWithoutNull != null) {
      addFilter(colsWithoutNull.field, colsWithoutNull.title);
    }
  };

  const removeFilterByIndexInternal = (index: number) => {
    removeFilterByIndex(index);
    updateRawfilters(filtersFromStore.value);
  };

  const updateFilterValue = (
    index: number,
    operator: FilterOperator,
    value: FilterValue
  ) => {
    console.log('updateFilterValue', index, operator, JSON.stringify(value));

    // Handle operators that need a value (all except isnull and isnotnull)
    // and the case when the new value is an empty string (e.g. because the
    // input field is empty).
    // Reason: the UI is build out from a pinia store that is updated by
    // the rawfilters that are parsed from the URL. If the new value for a filter
    // is empty, that filter is by convention not part of the URL. In consequence,
    // the filter would be removed from URL and then from rawfilters and UI store.
    // This is usually not what a user would expect if he/she just clears the input.
    // The  isValueEmptyChange flag is used to handel that case.
    if (
      operator !== 'isnull' &&
      operator !== 'isnotnull' &&
      (value === '' || value == null)
    ) {
      isValueEmptyChange = true;
    }

    const updatedFilters = filtersFromStore.value.map((filter, i) =>
      i === index ? { ...filter, operator, value } : filter
    );

    setFilters(updatedFilters);
    updateRawfilters(filtersFromStore.value);
    setTimeout(() => (isValueEmptyChange = false), 50);
  };

  const removeAllFilters = () => updateRawfilters([]);

  return {
    canFilter,
    filtersFromStore,
    isFilterActive,
    addEmptyFilter,
    addFilter: addFilterInternal,
    removeAllFilters,
    removeFilterByField: removeFilterByFieldInternal,
    removeFilterByIndex: removeFilterByIndexInternal,
    updateFilterValue,
  };
};
