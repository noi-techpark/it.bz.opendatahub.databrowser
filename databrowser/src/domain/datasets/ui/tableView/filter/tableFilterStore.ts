// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
    addFilterByPropertyPath(propertyPath: string, title: string) {
      this.filters = [
        ...this.filters,
        { propertyPath: propertyPath, title, operator: 'eq', value: '' },
      ];
    },
    removeFilterByPropertyPath(propertyPath?: string) {
      if (propertyPath != null) {
        this.filters = this.filters.filter(
          (filter) => filter.propertyPath !== propertyPath
        );
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
