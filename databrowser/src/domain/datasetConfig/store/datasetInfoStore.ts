// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDatasetInfo } from '../datasetInfo';
import { useDatasetSourceStore } from './datasetSourceStore';
import { watch } from 'vue';

export const useDatasetInfoStore = defineStore('datasetInfoStore', () => {
  const { currentRoute } = useRouter();
  const { source } = storeToRefs(useDatasetSourceStore());
  const datasetInfo = useDatasetInfo(currentRoute, source);

  // Update dataset config source, because it may change after the dataset info
  // has been computed (e.g. if a fallback config is used)
  watch(
    () => datasetInfo,
    ({ isEmbeddedSource, isGeneratedSource }) => {
      if (isEmbeddedSource.value) {
        source.value = 'embedded';
      } else if (isGeneratedSource.value) {
        source.value = 'generated';
      }
    },
    { immediate: true }
  );

  return datasetInfo;
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatasetInfoStore, import.meta.hot));
}
