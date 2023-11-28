<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex gap-3">
    <div class="flex flex-col gap-3">
      <SelectWithLabelVue
        :label="t('datasets.editView.map.gpsType')"
        :value="props.gpsType"
        :options="[{ label: props.gpsType, value: props.gpsType }]"
        class="w-full md:w-64"
      />
      <InputCustom
        v-model="position.latitude"
        :label="t('datasets.editView.map.latitude')"
        type="text"
        input-classes="w-full md:w-64"
        has-label-top
      />
      <InputCustom
        v-model="position.longitude"
        :label="t('datasets.editView.map.longitude')"
        type="text"
        input-classes="w-full md:w-64"
        has-label-top
      />
      <InputCustom
        v-model="position.altitude"
        :label="t('datasets.editView.map.altitude')"
        type="text"
        input-classes="w-full md:w-64"
        has-label-top
      />
      <InputCustom
        v-model="position.unitMeasureAltitude"
        :label="t('datasets.editView.map.altitudeUnit')"
        type="text"
        disabled
        input-classes="w-full md:w-64"
        has-label-top
      />
    </div>

    <div class="w-full">
      <QuickViewCardOverview
        :title="t('datasets.editView.map.mapPreviewDataInserted')"
        content-has-no-padding
        :sections="[]"
        :cta-icon="['IconPencil', 'IconExpand']"
        :icons-active="iconsActive"
        @cta-click="onCtaClick"
      >
        <template #content>
          <div
            :class="
              isFullscreen
                ? ['fixed top-0 left-0 z-[999] w-full h-full']
                : ['relative']
            "
          >
            <div
              v-if="isFullscreen"
              class="fixed right-4 top-4 z-[9999] flex items-center gap-3"
            >
              <ButtonCustom
                variant="ghost"
                size="xs"
                class="flex h-12 w-12 items-center justify-center bg-white p-2"
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
                class="flex h-12 w-12 items-center justify-center bg-white p-2"
                @click="toggleFullScreen()"
                ><IconParser
                  name="IconClose"
                  class="cursor-pointer text-green-400"
              /></ButtonCustom>
            </div>
            <div
              ref="tooltip"
              class="pointer-events-none absolute bottom-6 right-2 z-[999] rounded-md bg-black px-2 py-1 text-sm text-white opacity-0 transition-all"
            >
              {{ t('datasets.editView.map.clickOnTheMapToSetGPSPoint') }}
            </div>
            <MapBase
              :key="`map_${isFullscreen}`"
              :center="map.center"
              :markers="map.markers"
              :enable-set-marker="enableSetMarker"
              :height="isFullscreen ? '100%' : '400px'"
              @map-click="onMapClick"
            />
          </div>
        </template>
      </QuickViewCardOverview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { PointExpression } from 'leaflet';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from '../quickview/QuickViewCardOverview.vue';
import MapBase from '../../components/map/MapBase.vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import IconParser from '../utils/IconParser.vue';

import InputCustom from '../input/InputCustom.vue';
import SelectWithLabelVue from '../select/SelectWithLabel.vue';

const { t } = useI18n();

const emit = defineEmits(['newPosition']);

const enableSetMarker = ref(false);
const isFullscreen = ref(false);
const tooltip = ref();
const position = ref({
  latitude: '' as string | number | undefined,
  longitude: '' as string | number | undefined,
  altitude: '' as string | number | undefined,
  unitMeasureAltitude: '' as string | number | undefined,
  gpsType: '' as string | undefined,
});

const props = withDefaults(
  defineProps<{
    latitude?: string | number;
    longitude?: string | number;
    altitude?: string | number;
    unitMeasureAltitude?: string | number;
    gpsType?: string;
  }>(),
  {
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
    unitMeasureAltitude: undefined,
    gpsType: undefined,
  }
);

const map = computed(() => {
  if (position.value.longitude == null || position.value.latitude == null) {
    return {
      center: undefined,
      markers: [],
    };
  }

  const lng = Number(position.value.longitude);
  const lat = Number(position.value.latitude);

  return {
    center: [lat, lng] as PointExpression,
    markers: [{ position: { lat, lng } }],
  };
});

const iconsActive = computed(() => {
  return enableSetMarker.value ? ['IconPencil'] : [];
});

onMounted(() => {
  position.value.latitude = props.latitude;
  position.value.longitude = props.longitude;
  position.value.altitude = props.altitude;
  position.value.unitMeasureAltitude = props.unitMeasureAltitude;
  position.value.gpsType = props.gpsType;
});

const onMapClick = (location: any) => {
  if (!enableSetMarker.value) return;

  const { latlng } = location;
  position.value.latitude = latlng.lat;
  position.value.longitude = latlng.lng;

  emit('newPosition', position.value);
};

const onCtaClick = async (iconValue: any) => {
  switch (iconValue) {
    case 'IconPencil':
      toggleEditMode();

      break;

    default:
      toggleFullScreen();
      break;
  }
};

const toggleEditMode = () => {
  enableSetMarker.value = !enableSetMarker.value;

  if (enableSetMarker.value) {
    showTooltip();
    setTimeout(() => {
      hideTooltip();
    }, 5000);
  } else {
    hideTooltip();
  }
};

const showTooltip = () => {
  tooltip.value.classList.add('opacity-100');
};

const hideTooltip = () => {
  tooltip.value.classList.remove('opacity-100');
};

const toggleFullScreen = () => {
  isFullscreen.value = !isFullscreen.value;
};
</script>
