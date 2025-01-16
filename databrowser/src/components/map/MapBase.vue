<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="relative w-full" :style="{ height }">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { AttributionControl, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { initMap } from './mapUtils';
import { LatLngPosition } from './types';
import { getDefaultAttribution, getDefaultCoordinates } from './utils';

const emit = defineEmits<{
  (e: 'mapClick', latLng: LatLngPosition): void;
}>();

const props = withDefaults(
  defineProps<{
    center?: LatLngPosition;
    markers?: LatLngPosition[];
    zoom?: number;
    height?: string;
    enableSetMarker?: boolean;
    hideAttribution?: boolean;
  }>(),
  {
    center: () => getDefaultCoordinates(),
    markers: () => [],
    zoom: 8,
    height: '400px',
    enableSetMarker: false,
    hideAttribution: false,
  }
);

const map = ref<Map>();
const mapLoaded = ref<boolean>(false);

onUnmounted(() => {
  if (map.value != null) {
    map.value.remove();
  }
});

onMounted(() => {
  map.value = initMap({
    center: props.center,
    zoom: props.zoom,
  });

  map.value.on('load', () => {
    mapLoaded.value = map.value?.loaded() ?? false;
  });

  map.value.on('click', (event) => emit('mapClick', event.lngLat));
});

// Draw and update markers
let currentMarkers: Marker[] = [];
watch(
  [mapLoaded, () => props.markers],
  ([mapLoadedValue, markers]) => {
    if (!mapLoadedValue) {
      return;
    }

    const mapValue = map.value;

    if (mapValue == null) {
      console.error('Map is null');
      return;
    }

    currentMarkers.forEach((marker) => marker.remove());
    currentMarkers = [];

    markers.forEach((marker) => {
      const newMarker = new Marker().setLngLat(marker).addTo(mapValue);
      currentMarkers.push(newMarker);
    });
  },
  { immediate: true }
);

// Set cursor depending on enableSetMarker
watch(
  [mapLoaded, () => props.enableSetMarker],
  ([mapLoadedValue, enableSetMarker]) => {
    if (!mapLoadedValue) {
      return;
    }

    const mapValue = map.value;

    if (mapValue == null) {
      console.error('Map is null');
      return;
    }

    mapValue.getCanvas().style.cursor = enableSetMarker ? 'crosshair' : '';
  }
);

// Show / hide attribution
let attributionControl: AttributionControl | undefined;
watch(
  [mapLoaded, () => props.hideAttribution],
  ([mapLoadedValue, hideAttribution]) => {
    if (!mapLoadedValue) {
      return;
    }

    const mapValue = map.value;

    if (mapValue == null) {
      console.error('Map is null');
      return;
    }

    if (
      hideAttribution &&
      attributionControl != null &&
      mapValue.hasControl(attributionControl)
    ) {
      mapValue.removeControl(attributionControl);
      attributionControl = undefined;
    } else if (!hideAttribution && attributionControl == null) {
      attributionControl = new AttributionControl({
        customAttribution: getDefaultAttribution(),
      });
      mapValue.addControl(attributionControl, 'bottom-right');
    }
  }
);
</script>
