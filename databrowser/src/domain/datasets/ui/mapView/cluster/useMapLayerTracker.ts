// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, readonly, ref } from 'vue';

export interface LayerId {
  clusteredId: string;
  unclusteredId: string;
}

/**
 * Keep track of layers on the map.
 *
 * @returns {Object} layerIds - The layer ids.
 * @returns {Object} layerIdsByDatasetId - The layer ids by dataset id.
 * @returns {Function} addLayerId - Add a layer id.
 * @returns {Function} removeLayerId - Remove a layer id.
 * @returns {Function} hasLayerId - Check if a layer id exists.
 */
export const useMapLayerTracker = () => {
  const layerIdsByDatasetId = ref<Record<string, LayerId>>({});

  const addLayerId = (datasetId: string, layerId: LayerId) => {
    layerIdsByDatasetId.value = {
      ...layerIdsByDatasetId.value,
      [datasetId]: layerId,
    };
  };

  const removeLayerId = (datasetId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [datasetId]: _, ...rest } = layerIdsByDatasetId.value;
    layerIdsByDatasetId.value = rest;
  };

  const hasLayerId = (datasetId: string) => {
    return datasetId in layerIdsByDatasetId.value;
  };

  const layerIds = computed(() => Object.values(layerIdsByDatasetId.value));

  return {
    layerIds,
    layerIdsByDatasetId: readonly(layerIdsByDatasetId),
    addLayerId,
    removeLayerId,
    hasLayerId,
  };
};
