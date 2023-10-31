// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { MultipleFilesLanguages, FileLanguageUpdate } from './types';

export const useDialogStore = defineStore('dialogStore', {
  state: () => ({ _items: [] as MultipleFilesLanguages, _activeTab: 0 }),
  getters: {
    items(state) {
      return JSON.parse(JSON.stringify(state._items)) as MultipleFilesLanguages;
    },
    activeTab(state) {
      return state._activeTab;
    },
  },
  actions: {
    setItems(items: MultipleFilesLanguages) {
      this._items = JSON.parse(JSON.stringify(items));
    },

    updateItem(index: number, update: FileLanguageUpdate) {
      this._items[this._activeTab].data[index] = {
        ...this._items[this._activeTab].data[index],
        ...update,
      };
    },

    setActiveTab(index: number) {
      this._activeTab = index;
    },

    setAvailableItemLanguage(index: number, available: boolean) {
      this._items[this._activeTab].data[index].available = available;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot));
}
