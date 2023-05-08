import { ComputedRef, computed } from 'vue';
import { replacePlaceholders, useApiParameterReplacements } from '../api';
import { useDatasetConfigStore } from './store/datasetConfigStore';

export interface TableViewColumn {
  title: string;
  // Defined if there is exactly one field
  field?: string;
}

export const useTableViewColumns = (): ComputedRef<TableViewColumn[]> => {
  const replacements = useApiParameterReplacements();
  const elements = useDatasetConfigStore().tableView?.elements ?? [];

  return computed(() => {
    const replace = (s: string): string =>
      replacePlaceholders(s, replacements.value);

    return elements.map((element) => {
      const values = Object.values(element.fields ?? {});
      const field = values.length === 1 ? replace(values[0]) : undefined;
      return { title: element.title, field };
    });
  });
};
