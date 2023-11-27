// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { MultipleFilesLanguages, FileLanguageUpdate } from './types';

export const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    _items: [] as MultipleFilesLanguages,
    _originalItems: [] as MultipleFilesLanguages,
    _activeTab: 0,
    _ignoreDelete: false,
  }),
  getters: {
    items(state) {
      return JSON.parse(JSON.stringify(state._items)) as MultipleFilesLanguages;
    },
    originalItems(state) {
      return JSON.parse(
        JSON.stringify(state._originalItems)
      ) as MultipleFilesLanguages;
    },
    activeTab(state) {
      return state._activeTab;
    },
    ignoreDelete(state) {
      return state._ignoreDelete;
    },
  },
  actions: {
    setItems(items: MultipleFilesLanguages) {
      this._items = JSON.parse(JSON.stringify(items));
    },

    setOriginalItems(items: MultipleFilesLanguages) {
      this._originalItems = JSON.parse(JSON.stringify(items));
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

    setIgnoreDelete(value: boolean) {
      this._ignoreDelete = value;
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
