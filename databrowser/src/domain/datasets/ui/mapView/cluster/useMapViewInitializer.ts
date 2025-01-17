// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Map } from 'maplibre-gl';
import { Ref, watch } from 'vue';
import { ClusterMapInitializer } from '../../../../../components/map/clusterMap/types';
import { useClusterMapLayerTracker } from '../../../../../components/map/clusterMap/useClusterMapLayerTracker';
import { ClusterFeature, MapSourceWithMetaData, MarkerFeature } from '../types';
import { useMapViewMarkerPainting } from './useMapViewMarkerPainting';
import { useMapViewLayerHandler } from './useMapViewLayerHandler';

export const useMapViewInitializer = (
  sources: Ref<MapSourceWithMetaData[]>,
  activeMarker: Ref<MarkerFeature | undefined>,
  activeCluster: Ref<ClusterFeature | undefined>,
  markerClick: (feature: MarkerFeature) => void,
  clusterClick: (feature: ClusterFeature) => void
): {
  initClusterMap: ClusterMapInitializer;
} => {
  const initClusterMap = (map: Map) => {
    const clusterMap = useClusterMap(
      map,
      sources,
      activeMarker,
      activeCluster,
      markerClick,
      clusterClick
    );

    map.on('moveend', () => clusterMap.paintMarkers(map));

    return clusterMap;
  };

  return { initClusterMap };
};

const useClusterMap = (
  map: Map,
  sources: Ref<MapSourceWithMetaData[]>,
  activeMarker: Ref<MarkerFeature | undefined>,
  activeCluster: Ref<ClusterFeature | undefined>,
  markerClick: (feature: MarkerFeature) => void,
  clusterClick: (feature: ClusterFeature) => void
) => {
  // Keep track of layers on the map
  const mapLayerTracker = useClusterMapLayerTracker();

  // Paint markers on the map
  const { paintMarkers } = useMapViewMarkerPainting(
    mapLayerTracker.layerIds,
    activeMarker,
    activeCluster,
    markerClick,
    clusterClick
  );

  const onLayerChangesDone = () => {
    // Repaint markers after all layer changes are applied
    if (map != null) {
      paintMarkers(map);
    }
  };

  useMapViewLayerHandler(map, sources, mapLayerTracker, onLayerChangesDone);

  // Repaint markers when the current active marker / cluster changes
  watch([activeMarker, activeCluster], () => {
    if (map != null) {
      paintMarkers(map);
    }
  });

  return { paintMarkers };
};
