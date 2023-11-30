// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useDatasetBaseInfoStore } from '../../datasets/config/store/datasetBaseInfoStore';
import { useMetaDataForRoute } from './useMetaData';

export const useMetaDataStore = defineStore('metaDataStore', () => {
  const { datasetPath, datasetQuery } = storeToRefs(useDatasetBaseInfoStore());
  return useMetaDataForRoute(datasetPath, datasetQuery);
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetaDataStore, import.meta.hot));
}
