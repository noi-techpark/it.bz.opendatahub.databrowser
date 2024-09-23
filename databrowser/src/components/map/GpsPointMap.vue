<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <UseFullscreen ref="fullscreenComponent" v-slot="{ toggle, isFullscreen }">
    <div
      class="size-full relative"
      :class="{
        'flex cursor-pointer items-center justify-center bg-black':
          !isFullscreen && mapView === 'table',
      }"
      @click="onContainerClick(isFullscreen)"
    >
      <IconExpanded
        v-if="mapView === 'table'"
        class="absolute text-white transition-all group-hover:scale-125"
      />
      <div
        v-if="isFullscreen"
        class="absolute right-4 top-4 z-[999] flex items-center gap-3"
      >
        <ButtonCustom
          v-if="mapView !== 'table' && editable"
          variant="ghost"
          size="xs"
          class="size-12 flex items-center justify-center bg-white p-2"
          @click="toggleEditMode()"
          ><IconParser
            name="IconPencil"
            :class="
              enableSetMarker
                ? 'w-6 h-6 border-[1.5px] border-green-400 p-[2px] rounded-[3px] bg-hint-calm-secondary'
                : 'h-5 w-5 cursor-pointer text-green-400'
            "
        /></ButtonCustom>
        <ButtonCustom
          variant="ghost"
          size="xs"
          class="size-12 flex items-center justify-center bg-white p-2"
          @click="toggle()"
          ><IconParser name="IconClose" class="cursor-pointer text-green-400"
        /></ButtonCustom>
      </div>
      <div
        class="pointer-events-none absolute bottom-6 right-2 z-[999] rounded-md bg-black px-2 py-1 text-sm text-white opacity-0 transition-all"
        :class="{
          'opacity-100': isTooltipVisible,
        }"
      >
        {{ t('datasets.editView.map.clickOnTheMapToSetGPSPoint') }}
      </div>
      <MapBase
        :key="`map_${isFullscreen}`"
        :center="map.center"
        :markers="map.markers"
        :enable-set-marker="enableSetMarker"
        :zoom="12"
        :height="isFullscreen ? '100%' : height || '400px'"
        hide-controls
        :class="{
          'pointer-events-none opacity-50':
            !isFullscreen && mapView === 'table',
        }"
        @map-click="onMapClick"
      />
    </div>
  </UseFullscreen>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { PointExpression } from 'leaflet';
import { useI18n } from 'vue-i18n';

import MapBase from '../../components/map/MapBase.vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import IconParser from '../utils/IconParser.vue';

import UseFullscreen from '../fullscreen/UseFullscreen.vue';
import IconExpanded from '../svg/IconExpanded.vue';

const { t } = useI18n();

const emit = defineEmits(['mapClick', 'enableSetMarker']);

const tooltipInterval = ref();
const isTooltipVisible = ref(false);

const fullscreenComponent = ref();
const enableSetMarker = ref(false);

const props = withDefaults(
  defineProps<{
    latitude?: string | number;
    longitude?: string | number;
    height?: string;
    fallbackCenter?: PointExpression;
    editable?: boolean;
    mapView?: undefined | 'table';
  }>(),
  {
    latitude: undefined,
    longitude: undefined,
    height: undefined,
    fallbackCenter: undefined,
    editable: false,
    mapView: undefined,
  }
);

const { latitude, longitude, fallbackCenter } = toRefs(props);

const map = computed(() => {
  if (longitude.value == null || latitude.value == null) {
    return {
      center: fallbackCenter.value || undefined,
      markers: [],
    };
  }

  const lng = Number(longitude.value);
  const lat = Number(latitude.value);

  return {
    center: [lat, lng] as PointExpression,
    markers: [{ position: { lat, lng } }],
  };
});

watch(enableSetMarker, (newVal) => emit('enableSetMarker', newVal));

const onMapClick = (location: any) => {
  if (!enableSetMarker.value) return;

  const { latlng } = location;
  const { lat, lng } = latlng;

  emit('mapClick', { lat, lng });
};

const toggleFullscreen = () => {
  fullscreenComponent.value.toggleFullscreen();
};

const toggleEditMode = () => {
  enableSetMarker.value = !enableSetMarker.value;

  if (enableSetMarker.value) {
    showTooltip();
    tooltipInterval.value = setTimeout(() => {
      hideTooltip();
    }, 5000);
  } else {
    hideTooltip();
  }
};

const showTooltip = () => {
  isTooltipVisible.value = true;
};

const hideTooltip = () => {
  isTooltipVisible.value = false;
  clearInterval(tooltipInterval.value);
};

const onContainerClick = (isFullscreen: boolean) => {
  if (props.mapView !== 'table') return;

  if (props.mapView === 'table' && isFullscreen) return;

  toggleFullscreen();
};

defineExpose({ toggleEditMode, toggleFullscreen });
</script>
