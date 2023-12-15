// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { SelectOption } from '../../../../../components/select/types';

interface State {
  positionOptions: SelectOption[];
}

const initialState: State = {
  positionOptions: [],
};

export const useEditGpsInfoCellStore = defineStore('editGpsInfoCellStore', {
  state: () => initialState,

  actions: {
    setPositionOptions(options: SelectOption[]) {
      this.positionOptions = options;
    },
  },

  getters: {
    sortedPositionOptions(state) {
      return state.positionOptions.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useEditGpsInfoCellStore, import.meta.hot)
  );
}
