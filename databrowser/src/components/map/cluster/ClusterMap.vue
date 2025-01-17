<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseMap :map-loaded="mapLoaded" @map-id="handleMapIdChange" />
</template>

<script setup lang="ts">
import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onUnmounted, ref } from 'vue';
import BaseMap from '../BaseMap.vue';
import { initMap } from '../mapUtils';
import { ClusterMapInitializer } from './types';

const props = defineProps<{
  initClusterMap: ClusterMapInitializer;
}>();

const map = ref<Map>();
const mapLoaded = ref<boolean>(false);

const handleMapIdChange = (mapId: string) => {
  if (map.value != null) {
    map.value.remove();
  }

  map.value = initMap(mapId);

  map.value.on('load', () => {
    mapLoaded.value = map.value?.loaded() ?? false;

    if (map.value != null && mapLoaded.value) {
      props.initClusterMap(map.value);
    }
  });
};

onUnmounted(() => {
  if (map.value != null) {
    map.value.remove();
  }
});
</script>
