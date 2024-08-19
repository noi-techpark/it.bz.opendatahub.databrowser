// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { useCookies } from 'vue3-cookies';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const { cookies } = useCookies();

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndLarger = breakpoints.greater('md');

const preferredToolboxVisibility = !mdAndLarger.value
  ? 'false'
  : cookies.get('isToolboxVisible');
const initialState = {
  visible: preferredToolboxVisibility === 'false' ? false : true,
  settings: {
    showAll: false,
    showDeprecated: false,
    showReferences: true,
  },
};

export const useToolBoxStore = defineStore('toolBoxStore', {
  state: () => initialState,
});

export const toggleToolboxVisibility = (isVisible: boolean) => {
  const toolBoxStore = useToolBoxStore();
  toolBoxStore.visible = isVisible;
  cookies.set('isToolboxVisible', String(isVisible));
};

export const toggleShowAll = (showAll: boolean) => {
  const toolBoxStore = useToolBoxStore();
  toolBoxStore.settings.showAll = showAll;
};

export const toggleShowDeprecated = (showDeprecated: boolean) => {
  const toolBoxStore = useToolBoxStore();
  toolBoxStore.settings.showDeprecated = showDeprecated;
};

export const toggleShowReferences = (showReferences: boolean) => {
  const toolBoxStore = useToolBoxStore();
  toolBoxStore.settings.showReferences = showReferences;
};

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToolBoxStore, import.meta.hot));
}
