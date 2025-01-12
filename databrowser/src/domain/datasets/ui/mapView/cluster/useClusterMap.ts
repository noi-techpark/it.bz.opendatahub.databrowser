// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { GeoJSONSource, Map as MapLibre } from 'maplibre-gl';
import { Ref, watch } from 'vue';
import { ClusterFeature, MapSourceWithMetaData, MarkerFeature } from '../types';
import { useClusterMarkerPainting } from './paintMarkers';
import { LayerId, useMapLayerTracker } from './useMapLayerTracker';

const buildSourceName = (id: string) => `markers-${id}`;

const buildUnclusteredId = (source: string) => `unclustered-${source}`;

const buildClusteredId = (source: string) => `clustered-${source}`;

export const useClusterMap = (
  map: Ref<MapLibre | undefined>,
  mapLoaded: Ref<boolean>,
  sources: Ref<MapSourceWithMetaData[]>,
  activeMarker: Ref<MarkerFeature | undefined>,
  activeCluster: Ref<ClusterFeature | undefined>,
  markerClick: (featureProps: MarkerFeature) => void,
  clusterClick: (feature: ClusterFeature) => void
) => {
  // Keep track of layers on the map
  const {
    layerIds,
    layerIdsByDatasetId,
    addLayerId,
    removeLayerId,
    hasLayerId,
  } = useMapLayerTracker();

  // Paint markers on the map
  const { paintMarkers } = useClusterMarkerPainting(
    layerIds,
    activeMarker,
    activeCluster,
    markerClick,
    clusterClick
  );

  // Add or remove layers from the map when the sources change
  watch([sources, mapLoaded], () => {
    if (mapLoaded.value === true && map.value != null) {
      const mapValue = map.value;

      // Remove unused layers from map
      removeUnusedLayers(
        mapValue,
        sources.value,
        layerIdsByDatasetId,
        removeLayerId
      );

      console.debug('layersAfterCleanup', mapValue.getLayersOrder());

      // Add new layers to map
      sources.value
        // Filter out sources that are already in mapClusters
        // IMPORTANT: this is a performance optimization with the assumption that
        // the data delivered by the API does not change.
        // If the data changes, this must be adapted.
        .filter(({ mapMetaData }) => !hasLayerId(mapMetaData.datasetId))
        .forEach((source) => addNewLayers(mapValue, source, addLayerId));

      console.debug('layersAfterAddition', mapValue.getLayersOrder());

      // Repaint markers after all layer changes are applied
      mapValue.once('idle', () => paintMarkers(mapValue));
    }
  });

  // Repaint markers when the current active marker / cluster changes
  watch([activeMarker, activeCluster], () => {
    if (map.value != null) {
      paintMarkers(map.value);
    }
  });

  return { paintMarkers };
};

const removeUnusedLayers = (
  map: MapLibre,
  sources: MapSourceWithMetaData[],
  layerIdsByDatasetId: Ref<Record<string, LayerId>>,
  removeLayerId: (datasetId: string) => void
) => {
  const newSourceIds = new Set(
    sources.map((source) => source.mapMetaData.datasetId)
  );

  for (const sourceId of Object.keys(layerIdsByDatasetId.value)) {
    if (!newSourceIds.has(sourceId)) {
      console.debug(`removing layer ${buildClusteredId(sourceId)}`);
      map.removeLayer(buildClusteredId(sourceId));
      console.debug(`removing layer ${buildUnclusteredId(sourceId)}`);
      map.removeLayer(buildUnclusteredId(sourceId));
      removeLayerId(sourceId);
    }
  }
};

const addNewLayers = (
  map: MapLibre,
  source: MapSourceWithMetaData,
  addLayerId: (datasetId: string, layerId: LayerId) => void
) => {
  const { mapMetaData, mapSource } = source;
  const { datasetId } = mapMetaData;
  const sourceName = buildSourceName(datasetId);

  const sourceOnMap = map.getSource(sourceName) as GeoJSONSource;

  if (sourceOnMap == null) {
    map.addSource(sourceName, mapSource);
  } else {
    sourceOnMap.setData(mapSource.data);
  }

  // Add cluster layers
  const clusteredId = buildClusteredId(datasetId);
  const unclusteredId = buildUnclusteredId(datasetId);

  console.debug(`Adding cluster layer ${clusteredId}`);
  map.addLayer({
    id: clusteredId,
    type: 'circle',
    source: sourceName,
    filter: ['has', 'point_count'],
    paint: { 'circle-radius': 0 },
    metadata: mapMetaData,
  });

  console.debug(`Adding unclustered layer ${unclusteredId}`);
  map.addLayer({
    id: unclusteredId,
    type: 'circle',
    source: sourceName,
    filter: ['!', ['has', 'point_count']],
    paint: { 'circle-radius': 0 },
    metadata: mapMetaData,
  });

  // Add the layers to bookkeeping
  addLayerId(datasetId, {
    clusteredId,
    unclusteredId,
  });
};
