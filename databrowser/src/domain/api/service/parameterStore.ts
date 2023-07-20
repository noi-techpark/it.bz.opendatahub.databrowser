// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ApiParameters, ParameterValue } from './types';

interface State {
  params: ApiParameters;
}

const state: State = {
  params: {},
};

export const useParameterStore = defineStore('parameterStore', {
  state: () => state,
  actions: {
    setParameter(key: string, value: ParameterValue) {
      this.params[key] = value;
    },
    getParameter(key: string) {
      return this.params[key];
    },
    getParameters() {
      return this.params;
    },
    setParameters(params: Record<string, ParameterValue>) {
      this.params = params;
    },
    removeParameter(key: string) {
      delete this.params[key];
    },
    clearParameters() {
      this.params = {};
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useParameterStore, import.meta.hot));
}
