// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { AdditionalPropertiesOptions } from '../propertyOptions';

interface State {
  visible: boolean;
  newValue: string;
  currentItemIndex: number;
  currentItem: AdditionalPropertiesOptions;
}

const initialState: State = {
  visible: false,
  newValue: '',
  currentItemIndex: 0,
  currentItem: { label: '', value: '', slug: '' },
};

export const useConfirmChangeAdditionalPropertyDialogStore = defineStore(
  'confirmChangeAdditionalPropertyDialogStore',
  {
    state: () => initialState,

    actions: {
      hide() {
        this.visible = false;
      },

      show() {
        this.visible = true;
      },

      setCurrentItem(currentItem: AdditionalPropertiesOptions) {
        this.currentItem = currentItem;
      },

      setNewValue(newValue: string) {
        this.newValue = newValue;
      },

      setCurrentItemIndex(currentItemIndex: number) {
        this.currentItemIndex = currentItemIndex;
      },
    },
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(
      useConfirmChangeAdditionalPropertyDialogStore,
      import.meta.hot
    )
  );
}
