// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ApiParameterValidator, ApiParameters } from './types';

interface State {
  params: ApiParameters;
  defaultParams: ApiParameters;
  validators: Record<string, ApiParameterValidator>;
}

const state: State = {
  params: {},
  defaultParams: {},
  validators: {},
};

export const useParameterStore = defineStore('parameterStore', {
  state: () => state,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useParameterStore, import.meta.hot));
}
