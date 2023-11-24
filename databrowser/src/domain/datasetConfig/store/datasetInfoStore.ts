// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDatasetInfo } from '../datasetInfo';
import { useDatasetSourceStore } from './datasetSourceStore';
import { watch } from 'vue';
import { useComputeRouteLocation } from '../location/routeLocation';

export const useDatasetInfoStore = defineStore('datasetInfoStore', () => {
  const router = useRouter();
  const { currentRoute } = router;

  const routeLocation = useComputeRouteLocation(currentRoute);
  const { source } = storeToRefs(useDatasetSourceStore());
  const datasetInfo = useDatasetInfo(routeLocation, source);

  // Update dataset config source, because it may change after the dataset info
  // has been computed (e.g. if a fallback config is used)
  watch(
    datasetInfo.isLoading,
    (isLoading) => {
      if (isLoading) {
        return;
      }

      const { isEmbeddedSource, isGeneratedSource } = datasetInfo;
      if (isEmbeddedSource.value) {
        source.value = 'embedded';
      } else if (isGeneratedSource.value) {
        source.value = 'generated';
      }
    },
    { immediate: true }
  );

  // Remove default values from query params. This is a pure esthetical
  // function, to avoid showing default values in the URL.
  watch(
    datasetInfo.datasetQuery,
    (datasetQuery) => {
      const defaultQueryValues = datasetQuery?.default;
      if (defaultQueryValues == null) {
        return;
      }

      const routeQuery = { ...currentRoute.value.query };

      // Remove default values from query params
      Object.entries(defaultQueryValues).forEach(([key, value]) => {
        if (routeQuery[key] === value) {
          delete routeQuery[key];
        }
      });

      // Update route
      router.replace({ query: routeQuery });
    },
    { immediate: true }
  );

  return datasetInfo;
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatasetInfoStore, import.meta.hot));
}
