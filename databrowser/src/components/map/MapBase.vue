<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="center"
    :style="{ height, cursor: enableSetMarker ? 'crosshair' : undefined }"
    :use-global-leaflet="false"
    :class="{ 'hide-controls': hideControls }"
    @ready="onMapReady"
  >
    <l-tile-layer
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      :attribution="attribution"
    ></l-tile-layer>
    <l-marker
      v-for="marker in markers"
      :key="
        marker.position.lat +
        '-' +
        marker.position.lng +
        '-' +
        new Date().getTime()
      "
      :lat-lng="[marker.position.lat, marker.position.lng]"
      class="marker"
      :style="{
        width: '10px',
      }"
    ></l-marker>
  </l-map>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { PointExpression } from 'leaflet';
import { Marker } from './types';

import 'leaflet/dist/leaflet.css';

const emit = defineEmits(['mapClick']);

const LMap = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LMap)
);

const LTileLayer = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LTileLayer)
);

const LMarker = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LMarker)
);

withDefaults(
  defineProps<{
    center?: PointExpression;
    markers: Array<Marker>;
    zoom?: number;
    height?: string;
    enableSetMarker?: boolean;
    hideControls?: boolean;
  }>(),
  {
    center: () => [40, 40],
    markers: () => [],
    zoom: 8,
    height: '400px',
    enableSetMarker: false,
    hideControls: false,
  }
);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const onMapReady = (map: any) => {
  map.on('click', onMapClick);
};

const onMapClick = async (event: any) => {
  emit('mapClick', event);
};
</script>

<style scoped>
.hide-controls :deep(.leaflet-control-container) {
  @apply hidden;
}
</style>
