// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { useNavigationCallback } from './useNavigation';

export const useNavigationStore = defineStore('navigationStore', () => {
  const { datasetDomain } = storeToRefs(useDatasetInfoStore());

  const navigation = useNavigationCallback(datasetDomain);

  return { navigation };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot));
}
