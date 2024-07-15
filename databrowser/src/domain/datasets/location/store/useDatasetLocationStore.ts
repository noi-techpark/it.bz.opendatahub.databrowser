// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { RecordId } from '../../types';
import { DatasetDomain, DatasetPath, DatasetQuery } from '../../config/types';
import { computeDatasetViewLocations } from '../datasetViewLocation';
import { DatasetLocationRoute } from '../types';

export const useDatasetLocationStore = defineStore(
  'datasetLocationStore',
  () => {
    const tableLocation = ref<DatasetLocationRoute>();
    const detailLocation = ref<DatasetLocationRoute>();
    const editLocation = ref<DatasetLocationRoute>();
    const newLocation = ref<DatasetLocationRoute>();
    const rawLocation = ref<DatasetLocationRoute>();

    const updateLocation = (
      datasetDomain: DatasetDomain | undefined,
      datasetPath: DatasetPath | undefined,
      datasetQuery: DatasetQuery['raw'] | undefined = {},
      recordId?: RecordId
    ) => {
      const locations = computeDatasetViewLocations(
        datasetDomain,
        datasetPath,
        datasetQuery,
        recordId
      );

      tableLocation.value = locations.tableLocation;
      detailLocation.value = locations.detailLocation;
      editLocation.value = locations.editLocation;
      newLocation.value = locations.newLocation;
      rawLocation.value = locations.rawLocation;
    };

    return {
      tableLocation,
      detailLocation,
      editLocation,
      newLocation,
      rawLocation,
      updateLocation,
    };
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetLocationStore, import.meta.hot)
  );
}
