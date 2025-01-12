<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="relative h-full w-full">
    <div
      v-if="!mapLoaded"
      class="absolute inset-0 flex items-center justify-center transition-all"
    >
      <IconCycle class="animate-spin text-dialog" />
    </div>
    <div :id="mapId" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import { initMap } from '../../../../../components/map/mapUtils';
import { randomId } from '../../../../../components/utils/random';
import { ClusterFeature, MapSourceWithMetaData, MarkerFeature } from '../types';
import { useClusterMap } from './useClusterMap';
import IconCycle from '../../../../../components/svg/IconCycle.vue';

const emit = defineEmits<{
  (e: 'markerClick', feature: MarkerFeature): void;
  (e: 'clusterClick', feature: ClusterFeature): void;
  (e: 'useMap', map: Map): void;
}>();

const props = defineProps<{
  sources: MapSourceWithMetaData[];
  activeMarker?: MarkerFeature;
  activeCluster?: ClusterFeature;
}>();

const { sources, activeMarker, activeCluster } = toRefs(props);

const map = ref<Map>();
const mapId = `map-${randomId()}`;
const mapLoaded = ref<boolean>(false);

const markerClick = (feature: MarkerFeature) => {
  emit('markerClick', feature);
};

const clusterClick = (feature: ClusterFeature) => {
  emit('clusterClick', feature);
};

const { paintMarkers } = useClusterMap(
  map,
  mapLoaded,
  sources,
  activeMarker,
  activeCluster,
  markerClick,
  clusterClick
);

onUnmounted(() => {
  if (map.value != null) {
    map.value.remove();
  }
});

onMounted(() => {
  map.value = initMap(mapId);

  map.value.on('load', () => {
    mapLoaded.value = map.value?.loaded() ?? false;
  });

  map.value.on('moveend', function () {
    if (map.value == null) {
      console.error('moveend handler: map is null');
      return;
    }

    // Update markers on map
    paintMarkers(map.value);
  });
});
</script>

<style>
.clip-marker-icon-clip {
  clip-path: url(#marker-icon-clip);
}
</style>
