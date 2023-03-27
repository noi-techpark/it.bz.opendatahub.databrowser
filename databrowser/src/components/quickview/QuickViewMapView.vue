<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.locationOnMap')"
    content-has-no-padding
    :sections="[]"
  >
    <template #content>
      <MapBase :center="map.center" :markers="map.markers" />
    </template>
  </QuickViewCardOverview>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import { PointExpression } from 'leaflet';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';
import MapBase from '../../components/map/MapBase.vue';

const { t } = useI18n();

interface GpsInfo {
  Latitude: number;
  Longitude: number;
}

const props = withDefaults(
  defineProps<{
    gpsInfo: Array<GpsInfo>;
  }>(),
  {
    gpsInfo: () => [],
  }
);

const map = computed(() => {
  if (!props.gpsInfo.length) {
    return {
      center: undefined,
      markers: [],
    };
  }

  const { Longitude, Latitude } = props.gpsInfo[0];

  const mapObj = {
    center: [Latitude, Longitude] as PointExpression,
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
