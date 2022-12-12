<template>
  <ol-map :style="`height: ${height}`" class="map-ct">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-zoom-control></ol-zoom-control>
    <ol-fullscreen-control></ol-fullscreen-control>

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-for="(m, i) in markers" :key="i">
      <ol-source-vector>
        <ol-feature>
          <ol-geom-point
            :coordinates="[m.position.lng, m.position.lat]"
          ></ol-geom-point>
          <ol-style>
            <ol-style-icon :src="markerIcon" :scale="1"></ol-style-icon>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>

<script lang="ts" setup>
import markerIcon from '../../assets/map-marker.svg';

import { defineProps } from 'vue';

defineProps({
  center: {
    type: Array,
    default: () => [40, 40],
  },
  markers: {
    type: Array,
    default: () => [],
  },
  projection: {
    type: String,
    default: 'EPSG:4326',
  },
  zoom: {
    type: Number,
    default: 19,
  },
  rotation: {
    type: Number,
    default: 0,
  },

  height: {
    type: String,
    default: '400px',
  },
});
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
