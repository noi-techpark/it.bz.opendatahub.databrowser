// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { DatasetLocationRoute } from '../types';
import {
  DatasetDomain,
  DatasetPath,
  DatasetQuery,
} from '../../../datasetConfig/types';
import { computeDatasetLocations } from '../datasetLocation';

export const useDatasetLocationStore = defineStore(
  'datasetLocationStore',
  () => {
    const tableLocation = ref<DatasetLocationRoute>();
    const detailLocation = ref<DatasetLocationRoute>();
    const editLocation = ref<DatasetLocationRoute>();
    const newLocation = ref<DatasetLocationRoute>();
    const rawLocation = ref<DatasetLocationRoute>();
    const quickLocation = ref<DatasetLocationRoute>();

    const updateLocation = (
      datasetDomain: DatasetDomain | undefined,
      datasetPath: DatasetPath | undefined,
      datasetQuery: DatasetQuery['raw'] | undefined = {},
      record?: any
    ) => {
      const locations = computeDatasetLocations(
        datasetDomain,
        datasetPath,
        datasetQuery,
        record
      );

      tableLocation.value = locations.tableLocation;
      detailLocation.value = locations.detailLocation;
      editLocation.value = locations.editLocation;
      newLocation.value = locations.newLocation;
      rawLocation.value = locations.rawLocation;
      quickLocation.value = locations.quickLocation;
    };

    return {
      tableLocation,
      detailLocation,
      editLocation,
      newLocation,
      rawLocation,
      quickLocation,
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
