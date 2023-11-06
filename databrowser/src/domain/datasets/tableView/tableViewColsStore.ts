// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { ListViewConfig } from '../../datasetConfig/types';

export const useTableViewColsStore = defineStore('tableViewColsStore', {
  getters: {
    cols() {
      return (
        (useDatasetConfigStore().view as ListViewConfig | undefined)
          ?.elements ?? []
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
