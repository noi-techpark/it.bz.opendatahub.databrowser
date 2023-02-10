<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.locationOnMap')"
    cta-icon="IconExpand"
    content-has-no-padding
    :sections="[]"
    @cta-click="openMapFullscreen()"
  >
    <template #content>
      <MapBase
        ref="mapComponent"
        :key="map.center.length"
        :center="map.center"
        :markers="map.markers"
      />
    </template>
  </QuickViewCardOverview>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';
import MapBase from '../../components/map/MapBase.vue';

const { t } = useI18n();
const mapComponent = ref(null);

const props = withDefaults(
  defineProps<{
    gpsInfo: Array<any>;
  }>(),
  {
    gpsInfo: () => [],
  }
);

const openMapFullscreen = () => {
  const fullscreenButton = document.querySelector(
    '.ol-full-screen > button'
  ) as HTMLElement;

  fullscreenButton!.click();
};

const map = computed(() => {
  if (!props.gpsInfo.length) {
    return {
      center: [],
      markers: [],
    };
  }

  const { Longitude, Latitude } = props.gpsInfo[0];

  const mapObj = {
    center: [Longitude, Latitude],
    markers: [
      {
        position: {
          lat: Latitude,
          lng: Longitude,
        },
      },
    ],
  };

  return mapObj;
});
</script>
