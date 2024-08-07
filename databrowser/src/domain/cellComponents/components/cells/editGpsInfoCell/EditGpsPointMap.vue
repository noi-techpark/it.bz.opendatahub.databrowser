<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-wrap gap-3 lg:flex-nowrap">
    <div class="flex basis-full flex-col gap-3 lg:basis-1/3">
      <SubCategoryItem :title="t('datasets.editView.map.gpsType')">
        <SelectWithOptionsCell
          id="select-gps-type"
          :value="position.gpsType"
          :options="gpsTypeOptions"
          show-add-new-value
          :editable="editable"
          class="w-full"
          @update="onUpdateGpsType($event.value)"
          @add-new-value="onAddNewValueInSelect"
        />
      </SubCategoryItem>
      <SubCategoryItem :title="t('datasets.editView.map.latitude')">
        <StringCell
          :text="position.latitude"
          :editable="editable"
          @input="onUpdateInputPositionValue('latitude', $event.target.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem :title="t('datasets.editView.map.longitude')">
        <StringCell
          :text="position.longitude"
          :editable="editable"
          @input="onUpdateInputPositionValue('longitude', $event.target.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem :title="t('datasets.editView.map.altitude')">
        <StringCell
          :text="position.altitude"
          :editable="editable"
          @input="onUpdateInputPositionValue('altitude', $event.target.value)"
        />
      </SubCategoryItem>

      <SubCategoryItem :title="t('datasets.editView.map.altitudeUnit')">
        <StringCell
          :text="position.unitMeasureAltitude"
          readonly
          @input="
            onUpdateInputPositionValue(
              'unitMeasureAltitude',
              $event.target.value
            )
          "
        />
      </SubCategoryItem>
    </div>

    <div class="z-0 basis-full lg:basis-2/3">
      <EditGpsPointOverview
        :title="t('datasets.editView.map.mapPreviewDataInserted')"
        content-has-no-padding
        :cta-icon="editable ? ['IconPencil', 'IconExpand'] : ['IconExpand']"
        :icons-active="iconsActive"
        @cta-click="onCtaClick"
      >
        <template #content>
          <GpsPointMap
            ref="gpsPointMap"
            :latitude="position.latitude"
            :longitude="position.longitude"
            :fallback-center="fallbackMapCenter"
            :editable="editable"
            @map-click="onMapClick"
            @enable-set-marker="onEnableSetMarker"
          />
        </template>
      </EditGpsPointOverview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PointExpression } from 'leaflet';
import { computed, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import GpsPointMap from '../../../../../components/map/GpsPointMap.vue';
import { Position } from '../../../../../components/map/types';
import { getCoordinatesOfBolzano } from '../../../../../components/map/utils';
import SubCategoryItem from '../../../../datasets/ui/category/SubCategoryItem.vue';
import { useEditStore } from '../../../../datasets/ui/editView/store/editStore';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import StringCell from '../stringCell/StringCell.vue';
import EditGpsPointOverview from './EditGpsPointOverview.vue';
import { useEditGpsInfoCellStore } from './editGpsInfoCellStore';
import { GpsInfoEntry } from './types';

const { editable } = useInjectEditMode();

const { t } = useI18n();

const emit = defineEmits(['newPosition']);

const editGpsInfoCellStore = useEditGpsInfoCellStore();
const editStore = useEditStore();

const enableSetMarker = ref(false);
const gpsPointMap = ref();

type GpsInfoEntryKey = keyof GpsInfoEntry;

const props = defineProps<{
  data: GpsInfoEntry;
}>();

const { data: position } = toRefs(props);

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
    if (!editStore.isEqual || !enableSetMarker.value || !editable.value) return;

    gpsPointMap.value.toggleEditMode();
  }
);

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
  onUpdatePosition({ ...position.value, gpsType: value });
};

const onMapClick = (newPosition: Position) => {
  onUpdatePosition({
    ...position.value,
    latitude: newPosition.lat,
    longitude: newPosition.lng,
  });
};

const onUpdateInputPositionValue = (key: GpsInfoEntryKey, value: string) => {
  onUpdatePosition({ ...position.value, [key]: value });
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

const onUpdatePosition = (value: GpsInfoEntry) => {
  emit('newPosition', value);
};
</script>
