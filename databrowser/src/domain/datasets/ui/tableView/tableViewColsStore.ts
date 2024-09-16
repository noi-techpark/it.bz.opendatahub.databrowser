// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { Column } from './types';

interface State {
  cols: Column[];
  showDeprecated: boolean;
}

const initialState = (): State => ({
  cols: [],
  showDeprecated: false,
});

export const useTableViewColsStore = defineStore('tableViewColsStore', {
  state: initialState,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTableViewColsStore, import.meta.hot)
  );
}
