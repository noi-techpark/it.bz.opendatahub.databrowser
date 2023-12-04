<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <EditListTab :items="items">
      <template #tabLabel="{ index }">
        <span> GPS Point {{ index + 1 }}</span>
      </template>

      <template #addItems>
        <EditListAddButton :text="'Add new GPS Point'" @click="addEmptyItem" />
      </template>

      <template #body="{ item, index }">
        <div class="flex flex-wrap gap-8 md:flex-nowrap">
          <div class="z-10 basis-full md:order-1 md:basis-3/4">
            <GpsPointMap
              :key="`map_${activeTab}`"
              :fallback-center="fallbackMapCenter"
              :latitude="item.Latitude"
              :longitude="item.Longitude"
              :altitude="item.Altitude"
              :unit-measure-altitude="item.AltitudeUnitofMeasure"
              :gps-type="item.Gpstype"
              @new-position="onNewPosition(index, $event)"
            />
          </div>
          <div class="basis-full md:order-3 md:basis-1/4">
            <div class="rounded border">
              <div
                class="flex items-center justify-between bg-gray-50 px-4 py-3"
              >
                <span class="font-semibold">Info &amp; action</span>
              </div>
              <div class="divide-y p-4">
                <div v-if="editable">
                  <button
                    class="m-3 flex items-center gap-3"
                    @click="duplicateItem(index)"
                  >
                    <IconCopy class="text-green-500" />
                    <span>Duplicate</span>
                  </button>
                </div>
                <div v-if="editable">
                  <button
                    class="mx-3 mt-3 flex items-center gap-3"
                    @click="deleteItems([index])"
                  >
                    <IconDelete class="text-delete" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </EditListTab>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import GpsPointMap from '../../../../../components/map/GpsPointMap.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

import { GpsInfoEntry } from './types';
import { PointPosition } from '../../../../../components/map/types';
import { getMappedDataFromMap } from './utils';
import { getCoordinatesOfBolzano } from '../../../../../components/map/utils';
import { PointExpression } from 'leaflet';

const props = defineProps<{ items: GpsInfoEntry[] }>();

const { items } = toRefs(props);

const { activeTab } = useInjectNavigation();

const { deleteItems, duplicateItem, updateItem, addEmptyItem } =
  useInjectActionTriggers();

const { editable } = useInjectEditMode();

const onNewPosition = (index: number, data: PointPosition) => {
  const mappedData = getMappedDataFromMap(data);

  updateItem(index, mappedData);
};

const fallbackMapCenter = computed(() => {
  const { lat, lng } = getCoordinatesOfBolzano();
  return [lat, lng] as PointExpression;
});
</script>
