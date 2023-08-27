// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { useDatasetConfigStore } from '../../datasetConfig/datasetConfigStore';

export const useTableViewColsStore = defineStore('tableViewColsStore', {
  getters: {
    cols() {
      return useDatasetConfigStore().tableView?.elements ?? [];
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useTableViewColsStore, import.meta.hot)
  );
}
