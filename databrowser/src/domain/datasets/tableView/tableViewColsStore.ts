// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ListViewConfig } from '../../datasetConfig/types';
import { useDatasetViewStore } from '../view/store/datasetViewStore';

export const useTableViewColsStore = defineStore('tableViewColsStore', {
  getters: {
    cols() {
      return (
        (useDatasetViewStore().view as ListViewConfig | undefined)?.elements ??
        []
      );
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTableViewColsStore, import.meta.hot)
  );
}
