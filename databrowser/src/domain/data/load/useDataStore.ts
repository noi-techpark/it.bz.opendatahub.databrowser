// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { useLoadData } from './useDataLoad';

export const useDataStore = defineStore('dataStore', () => {
  const { fullPath } = storeToRefs(useDatasetInfoStore());

  const data = useLoadData(fullPath);

  return data;
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot));
}
