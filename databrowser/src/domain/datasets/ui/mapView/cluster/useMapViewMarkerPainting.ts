// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Feature, Point } from 'geojson';
import {
  GeoJSONSource,
  MapGeoJSONFeature,
  Map as MapLibre,
  Marker,
} from 'maplibre-gl';
import { h, Ref, render } from 'vue';
import MarkerIcon from '../MarkerIcon.vue';
import {
  ClusterFeature,
  ClusterNode,
  MapDatasetMetaData,
  MapRecord,
  MarkerFeature,
} from '../types';

interface LayerId {
  clusteredId: string;
  unclusteredId: string;
}

let oldMarkers: Marker[] = [];

export const useMapViewMarkerPainting = (
  layerIds: Ref<LayerId[]>,
  activeMarker: Ref<MarkerFeature | undefined>,
  activeCluster: Ref<ClusterFeature | undefined>,
  markerClick: (featureProps: MarkerFeature) => void,
  clusterClick: (feature: ClusterFeature) => void
) => {
  const paintMarkers = (map: MapLibre) => {
    // Remove old markers that were added to the map
    console.debug(`remove ${oldMarkers.length} markers`);
    for (const marker of oldMarkers) {
      marker.remove();
    }

    oldMarkers = [];

    // Add clustered markers
    const clusteredLayerIds = layerIds.value.map(
      (layerId) => layerId.clusteredId
    );

    const clusteredRenderedFeatures = map.queryRenderedFeatures({
      layers: clusteredLayerIds,
    });

    // Create custom HTML markers for each cluster
    clusteredRenderedFeatures.forEach(function (
      geoJsonFeature: MapGeoJSONFeature
    ) {
      const feature = geoJsonFeature as unknown as MapGeoJSONFeature & {
        properties: { point_count: number; cluster_id: number };
        geometry: { coordinates: [number, number] };
        layer: { metadata: MapDatasetMetaData };
      };
      const coordinates = feature.geometry.coordinates;
      const pointCount = feature.properties.point_count;

      const markerColor = computeColor(
        feature.layer.metadata.datasetId,
        feature.layer.metadata.datasetColor,
        activeMarker.value?.datasetId,
        activeCluster.value?.datasetId
      );

      const isMarkerActive =
        Number(activeCluster.value?.recordId) === feature.properties.cluster_id;

      const marker = renderMarker({
        map,
        coordinates,
        title: feature.layer.metadata.datasetAbbreviation,
        color: markerColor,
        count: pointCount,
        active: isMarkerActive,
        handleClick: () => handleClusterClick(map, feature, clusterClick),
      });

      oldMarkers.push(marker);
    });

    // Add unclustered markers
    const unclusteredLayerIds = layerIds.value.map(
      (layerId) => layerId.unclusteredId
    );

    const unclusteredRenderedFeatures = map.queryRenderedFeatures({
      layers: unclusteredLayerIds,
    });
    // Create custom HTML markers for each cluster
    unclusteredRenderedFeatures.forEach(function (geoJsonFeature) {
      const feature = geoJsonFeature as unknown as Feature<Point, MapRecord> & {
        layer: { metadata: MapDatasetMetaData };
      };
      const coordinates = feature.geometry.coordinates as [number, number];

      const markerColor = computeColor(
        feature.layer.metadata.datasetId,
        feature.layer.metadata.datasetColor,
        activeMarker.value?.datasetId,
        activeCluster.value?.datasetId
      );

      const isMarkerActive =
        activeMarker.value?.recordId === feature.properties.recordId;

      const marker = renderMarker({
        map,
        coordinates,
        title: feature.layer.metadata.datasetAbbreviation,
        color: markerColor,
        count: 1,
        active: isMarkerActive,
        handleClick: () => handleSingleMarkerClick(feature, markerClick),
      });

      oldMarkers.push(marker);
    });
  };

  return { paintMarkers };
};

const computeColor = (
  featureDatasetId: string,
  featureColor: string,
  activeMarkerDatasetId?: string,
  activeClusterDatasetId?: string
) => {
  if (activeMarkerDatasetId == null && activeClusterDatasetId == null) {
    return featureColor;
  }

  if (activeMarkerDatasetId === featureDatasetId) {
    return featureColor;
  }

  if (activeClusterDatasetId === featureDatasetId) {
    return featureColor;
  }

  // Return grey color if no feature is active
  return '#d2d2d2';
};

const renderMarker = ({
  map,
  coordinates,
  title,
  color,
  count,
  active,
  handleClick,
}: {
  map: MapLibre;
  coordinates: [number, number];
  title: string;
  color: string;
  count: number;
  active: boolean;
  handleClick: () => void;
}) => {
  const element = document.createElement('div');

  // Set clip-path for marker icon in order to adjust the
  // click area to the icon shape
  element.classList.add('clip-marker-icon-clip');

  // Set z-index to 10 if the marker is active
  if (active) {
    element.classList.add('z-10');
  }

  const marker = new Marker({ element })
    .setLngLat(coordinates)
    .setOffset([0, -30])
    .addTo(map);

  const props = {
    title,
    color,
    count,
    active,
    onClick() {
      handleClick();
    },
  };

  const vNode = h(MarkerIcon, props);

  render(vNode, element);

  return marker;
};

const handleClusterClick = async (
  map: MapLibre,
  feature: MapGeoJSONFeature & {
    properties: { point_count: number; cluster_id: number };
    geometry: { coordinates: [number, number] };
    layer: { metadata: MapDatasetMetaData };
  },
  clusterClick: (feature: ClusterFeature) => void
) => {
  // Get all cluster points
  const clusterId = feature.properties.cluster_id;
  const pointCount = feature.properties.point_count;

  const clusterSource = map.getSource<GeoJSONSource>(feature.source);

  const clusterLeaves = (await clusterSource?.getClusterLeaves(
    clusterId,
    pointCount,
    0
  )) as ClusterNode[];
  console.debug('clusterLeaves', clusterLeaves);

  const clusterFeature: ClusterFeature = {
    recordId: feature.id as string,
    name: feature.layer.metadata.datasetName,
    abbreviation: feature.layer.metadata.datasetAbbreviation,
    datasetId: feature.layer.metadata.datasetId,
    color: feature.layer.metadata.datasetColor,
    count: feature.properties.point_count,
    markers:
      clusterLeaves?.map<MapRecord>((feature) => {
        return feature.properties;
      }) ?? [],
  };

  clusterClick(clusterFeature);
};

const handleSingleMarkerClick = (
  feature: Feature<Point, MapRecord> & {
    layer: { metadata: MapDatasetMetaData };
  },
  markerClick: (featureProps: MarkerFeature) => void
) => {
  const markerFeature: MarkerFeature = {
    recordId: feature.properties.recordId,
    name: feature.properties.recordName,
    datasetId: feature.layer.metadata.datasetId,
    abbreviation: feature.layer.metadata.datasetAbbreviation,
    color: feature.layer.metadata.datasetColor,
  };

  markerClick(markerFeature);

  // const markerRect = marker.getElement().getBoundingClientRect();
  // setTimeout(() => {
  //   const recordDetail = document.querySelector('#record-detail');
  //   console.log('element', element);
  //   console.log('marker', marker);
  //   console.log('recordDetail', recordDetail);
  //   if (recordDetail) {
  //     // const markerRect = marker.getElement().getBoundingClientRect();
  //     const recordDetailRect = recordDetail.getBoundingClientRect();
  //     const horizontalOverlap =
  //       markerRect.right > recordDetailRect.left &&
  //       markerRect.left < recordDetailRect.right;
  //     const verticalOverlap =
  //       markerRect.bottom > recordDetailRect.top &&
  //       markerRect.top < recordDetailRect.bottom;

  //     console.log('markerRect', markerRect);
  //     console.log('recordDetailRect', recordDetailRect);

  //     console.log('horizontalOverlap', horizontalOverlap);
  //     console.log('verticalOverlap', verticalOverlap);
  //     console.log('overlap', horizontalOverlap && verticalOverlap);

  //     if (horizontalOverlap && verticalOverlap) {
  //       console.log('scrolling');
  //       // TODO: on mobile, coordinates must be adjusted to work with flyTo, on desktop, it works fine
  //       map.flyTo({
  //         center: marker.getLngLat(),
  //       });
  //     }
  //   }
  // }, 500);
};
