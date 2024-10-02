// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  breakpointsTailwind,
  useBreakpoints,
  useLocalStorage,
} from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndLarger = breakpoints.greater('md');

// Using useLocalStorage to persist toolbox visibility state
const toolboxVisibilityStorage = useLocalStorage('isToolboxVisible', true);

const preferredToolboxVisibility = !mdAndLarger.value
  ? 'false'
  : toolboxVisibilityStorage.value;

const initialState = {
  visible:
    preferredToolboxVisibility === 'false'
      ? false
      : toolboxVisibilityStorage.value,
  settings: {
    showAll: false,
    showDeprecated: false,
    showReferences: true,
  },
};

export const useToolBoxStore = defineStore('toolBoxStore', {
  state: () => initialState,

  actions: {
    toggleToolboxVisibility(isVisible: boolean) {
      this.visible = isVisible;
      toolboxVisibilityStorage.value = isVisible;
    },

    toggleShowAll(showAll: boolean) {
      this.settings.showAll = showAll;
    },

    toggleShowDeprecated(showDeprecated: boolean) {
      this.settings.showDeprecated = showDeprecated;
    },

    toggleShowReferences(showReferences: boolean) {
      this.settings.showReferences = showReferences;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToolBoxStore, import.meta.hot));
}
