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

const props = withDefaults(
  defineProps<{
    latitude?: string | number;
    longitude?: string | number;
  }>(),
  {
    latitude: undefined,
    longitude: undefined,
  }
);

const map = computed(() => {
  if (props.longitude == null) {
    return {
      center: undefined,
      markers: [],
    };
  }

  const Longitude = props.longitude;
  const Latitude = props.latitude;

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
