// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useComputeRouteLocation } from '../../location/routeLocation';
import { DatasetConfigSource } from '../types';
import { useDatasetBaseInfo } from './datasetBaseInfo';

export const useDatasetBaseInfoStore = defineStore(
  'datasetBaseInfoStore',
  () => {
    const router = useRouter();
    const { currentRoute } = router;
    const routeLocation = useComputeRouteLocation(currentRoute);

    // Source state
    const source = ref<DatasetConfigSource>('embedded');

    // Compute reactive dataset base info
    const baseInfo = useDatasetBaseInfo(routeLocation, source);

    // Update source state
    watch(
      baseInfo.source,
      (newSource) => (source.value = newSource ?? 'embedded'),
      { immediate: true }
    );

    // Remove default values from query params. This is a pure esthetical
    // function, to avoid showing default values in the URL.
    watch(
      baseInfo.datasetQuery,
      (datasetQuery) => {
        const defaultQueryValues = datasetQuery?.default;
        if (defaultQueryValues == null) {
          return;
        }

        const routeQuery = { ...currentRoute.value.query };

        let routeQueryChanged = false;
        // Remove default values from query params
        Object.entries(defaultQueryValues).forEach(([key, value]) => {
          if (routeQuery[key] === value) {
            delete routeQuery[key];
            routeQueryChanged = true;
          }
        });

        // Update route
        if (routeQueryChanged) {
          setTimeout(() => router.replace({ query: routeQuery }));
        }
      },
      { immediate: true }
    );

    return { ...baseInfo, source };
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetBaseInfoStore, import.meta.hot)
  );
}
