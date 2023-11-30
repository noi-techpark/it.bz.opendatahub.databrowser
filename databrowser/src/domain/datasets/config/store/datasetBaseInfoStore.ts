// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDatasetBaseInfo } from './datasetBaseInfo';
import { useComputeRouteLocation } from '../../../datasetConfig/location/routeLocation';
import { useDatasetSourceStore } from '../../../datasetConfig/store/datasetSourceStore';

export const useDatasetBaseInfoStore = defineStore(
  'datasetBaseInfoStore',
  () => {
    const router = useRouter();
    const { currentRoute } = router;

    const routeLocation = useComputeRouteLocation(currentRoute);
    const { source } = storeToRefs(useDatasetSourceStore());
    return useDatasetBaseInfo(routeLocation, source);
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetBaseInfoStore, import.meta.hot)
  );
}
