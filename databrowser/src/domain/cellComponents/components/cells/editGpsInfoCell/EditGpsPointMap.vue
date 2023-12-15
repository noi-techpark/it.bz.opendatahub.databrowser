<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-wrap gap-3 lg:flex-nowrap">
    <div class="flex basis-full flex-col gap-3 lg:basis-1/3">
      <div>
        <label for="select-gps-type" class="mb-1 inline-block">{{
          t('datasets.editView.map.gpsType')
        }}</label>
        <SelectWithOptionsCell
          id="select-gps-type"
          :value="position.gpsType"
          :options="gpsTypeOptions"
          show-add-new-value
          class="w-full"
          @update="onUpdateGpsType($event.value)"
          @add-new-value="onAddNewValueInSelect"
        />
      </div>
      <InputCustom
        v-model="position.latitude"
        :label="t('datasets.editView.map.latitude')"
        type="text"
        input-classes="w-full"
        has-label-top
        @input="onUpdatePosition()"
      />
      <InputCustom
        v-model="position.longitude"
        :label="t('datasets.editView.map.longitude')"
        type="text"
        input-classes="w-full"
        has-label-top
        @input="onUpdatePosition()"
      />
      <InputCustom
        v-model="position.altitude"
        :label="t('datasets.editView.map.altitude')"
        type="text"
        input-classes="w-full"
        has-label-top
        @input="onUpdatePosition()"
      />
      <InputCustom
        v-model="position.unitMeasureAltitude"
        :label="t('datasets.editView.map.altitudeUnit')"
        type="text"
        disabled
        input-classes="w-full"
        has-label-top
      />
    </div>

    <div class="z-0 basis-full lg:basis-2/3">
      <QuickViewCardOverview
        :title="t('datasets.editView.map.mapPreviewDataInserted')"
        content-has-no-padding
        :sections="[]"
        :cta-icon="['IconPencil', 'IconExpand']"
        :icons-active="iconsActive"
        @cta-click="onCtaClick"
      >
        <template #content>
          <GpsPointMap
            ref="gpsPointMap"
            :latitude="position.latitude"
            :longitude="position.longitude"
            :fallback-center="fallbackMapCenter"
            @map-click="onMapClick"
            @enable-set-marker="onEnableSetMarker"
          />
        </template>
      </QuickViewCardOverview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PointExpression } from 'leaflet';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InputCustom from '../../../../../components/input/InputCustom.vue';
import GpsPointMap from '../../../../../components/map/GpsPointMap.vue';
import { PointPosition, Position } from '../../../../../components/map/types';
import { getCoordinatesOfBolzano } from '../../../../../components/map/utils';
import QuickViewCardOverview from '../../../../../components/quickview/QuickViewCardOverview.vue';
import { useEditStore } from '../../../../datasets/ui/editView/store/editStore';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { useEditGpsInfoCellStore } from './editGpsInfoCellStore';

const { t } = useI18n();

const emit = defineEmits(['newPosition']);

const editGpsInfoCellStore = useEditGpsInfoCellStore();
const editStore = useEditStore();

const enableSetMarker = ref(false);
const gpsPointMap = ref();

const position = ref({
  latitude: '' as string | number | undefined,
  longitude: '' as string | number | undefined,
  altitude: '' as string | number | undefined,
  unitMeasureAltitude: '' as string | number | undefined,
  gpsType: '' as string | undefined,
} as PointPosition);

const props = withDefaults(defineProps<PointPosition>(), {
  latitude: undefined,
  longitude: undefined,
  altitude: undefined,
  unitMeasureAltitude: undefined,
  gpsType: undefined,
});

const iconsActive = computed(() => {
  return enableSetMarker.value ? ['IconPencil'] : [];
});

const gpsTypeOptions = computed(() => {
  return editGpsInfoCellStore.sortedPositionOptions;
});

const fallbackMapCenter = computed(() => {
  const { lat, lng } = getCoordinatesOfBolzano();
  return [lat, lng] as PointExpression;
});

const initialState = computed(() => {
  return editStore.initialAsJson;
});

watch(
  () => initialState.value,
  () => {
    if (!editStore.isEqual || !enableSetMarker.value) return;

    gpsPointMap.value.toggleEditMode();
  }
);

onMounted(() => {
  position.value.latitude = props.latitude;
  position.value.longitude = props.longitude;
  position.value.altitude = props.altitude;
  position.value.unitMeasureAltitude = props.unitMeasureAltitude || 'm';
  position.value.gpsType =
    props.gpsType || (gpsTypeOptions.value[0].value as string);
});

const setLastSavedType = () => {
  const fetchedOptions = editGpsInfoCellStore.positionOptions;

  if (
    !position.value.gpsType ||
    fetchedOptions.map((item) => item.value).includes(position.value.gpsType)
  ) {
    return;
  }

  editGpsInfoCellStore.setPositionOptions([
    ...fetchedOptions,
    { label: position.value.gpsType, value: position.value.gpsType },
  ]);
};

const onAddNewValueInSelect = (value: boolean) => {
  if (value) return;

  setLastSavedType();
};

const onUpdateGpsType = (value: string) => {
  position.value.gpsType = value;

  onUpdatePosition();
};

const onMapClick = (newPosition: Position) => {
  position.value.latitude = newPosition.lat;
  position.value.longitude = newPosition.lng;

  onUpdatePosition();
};

const onEnableSetMarker = (value: boolean) => {
  enableSetMarker.value = value;
};

const onCtaClick = async (iconValue: any) => {
  switch (iconValue) {
    case 'IconPencil':
      gpsPointMap.value.toggleEditMode();

      break;

    default:
      gpsPointMap.value.toggleFullscreen();
      break;
  }
};

const onUpdatePosition = () => {
  emit('newPosition', position.value);
};
</script>
