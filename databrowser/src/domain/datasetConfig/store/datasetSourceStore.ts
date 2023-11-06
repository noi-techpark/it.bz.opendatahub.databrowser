// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { DatasetConfigSource } from '../load/types';

interface State {
  source: DatasetConfigSource;
}

const initialState: State = {
  source: 'embedded',
};

export const useDatasetSourceStore = defineStore('datasetSourceStore', {
  state: () => initialState,
  getters: {
    isEmbedded: (state) => state.source === 'embedded',
    isGenerated: (state) => state.source === 'generated',
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetSourceStore, import.meta.hot)
  );
}
