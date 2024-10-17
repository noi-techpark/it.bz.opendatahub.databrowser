// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  visible: boolean;
  attributeName: string;
  referenceUrl: string;
}

const initialState: State = {
  visible: false,
  attributeName: '',
  referenceUrl: '',
};

export const useGoToReferenceAttributeDialogStore = defineStore(
  'goToReferenceAttributeDialogStore',
  {
    state: () => initialState,

    actions: {
      hide() {
        this.visible = false;
      },

      show() {
        this.visible = true;
      },
    },
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useGoToReferenceAttributeDialogStore, import.meta.hot)
  );
}
