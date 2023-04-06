<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="center"
    :style="{ height }"
    :use-global-leaflet="false"
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
    ></l-marker>
  </l-map>
</template>

<script lang="ts" setup>
import { defineProps, defineAsyncComponent } from 'vue';
import { PointExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LMap = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LMap)
);

const LTileLayer = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LTileLayer)
);

const LMarker = defineAsyncComponent(() =>
  import('@vue-leaflet/vue-leaflet').then((exports) => exports.LMarker)
);

interface Marker {
  position: Position;
}

interface Position {
  lat: number;
  lng: number;
}

withDefaults(
  defineProps<{
    center?: PointExpression;
    markers: Array<Marker>;
    zoom?: number;
    height?: string;
  }>(),
  {
    center: () => [40, 40],
    markers: () => [],
    zoom: 8,
    height: '400px',
  }
);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
</script>

<style>
.map-ct .ol-control {
  @apply bg-white p-0;

  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
}

.map-ct .ol-control button {
  @apply bg-white hover:bg-gray-100 text-black opacity-100 text-2xl 
  relative m-0;
}

.map-ct .ol-control button:first-child::after {
  @apply w-full bg-gray-300 left-0 absolute;

  content: '';
  height: 2px;
  bottom: -1px;
}

.map-ct .ol-full-screen {
  @apply hidden pointer-events-none;
}
</style>
