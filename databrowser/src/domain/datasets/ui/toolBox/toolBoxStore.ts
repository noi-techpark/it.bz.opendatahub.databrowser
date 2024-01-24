// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';

const initialState = { visible: false };

export const useToolBoxStore = defineStore('toolBoxStore', {
  state: () => initialState,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToolBoxStore, import.meta.hot));
}
