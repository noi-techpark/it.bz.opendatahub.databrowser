import { acceptHMRUpdate, defineStore } from 'pinia';
import { Filter } from './types';

interface State {
  filters: Filter[];
}

const initialState: State = {
  filters: [],
};

export const useTableFilterStore = defineStore('tableFilterStore', {
  state: () => initialState,

  actions: {
    addFilter(field: string, title: string) {
      this.filters = [
        ...this.filters,
        { field, title, operator: 'eq', value: '' },
      ];
    },
    removeFilterByField(field?: string) {
      if (field != null) {
        this.filters = this.filters.filter((filter) => filter.field !== field);
      }
    },
    removeFilterByIndex(index?: number) {
      if (index != null) {
        this.filters = this.filters.filter((_, i) => i !== index);
      }
    },
    setFilters(filters: Filter[]) {
      this.filters = filters;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTableFilterStore, import.meta.hot));
}
