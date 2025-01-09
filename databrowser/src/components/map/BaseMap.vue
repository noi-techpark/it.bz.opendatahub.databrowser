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
import 'maplibre-gl/dist/maplibre-gl.css';
import { onMounted, ref } from 'vue';
import IconCycle from '../svg/IconCycle.vue';
import { randomId } from '../utils/random';

defineProps<{ mapLoaded: boolean }>();
const emit = defineEmits<{ (e: 'mapId', id: string): void }>();

const mapId = ref(`map-${randomId()}`);

onMounted(() => emit('mapId', mapId.value));
</script>
