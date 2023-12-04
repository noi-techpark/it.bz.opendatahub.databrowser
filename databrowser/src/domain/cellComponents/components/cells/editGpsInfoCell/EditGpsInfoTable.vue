<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>
    <template #tableHeader>
      <TableHeaderCell>MAP</TableHeaderCell>
      <TableHeaderCell>LATITUDE</TableHeaderCell>
      <TableHeaderCell>LONGITUDE</TableHeaderCell>
      <TableHeaderCell>ALTITUDE</TableHeaderCell>
      <TableHeaderCell>UNIT</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
      <TableCell>
        <UseFullscreen
          v-slot="{ toggle, isFullscreen }"
          class="flex items-center justify-center md:items-stretch"
        >
          <div
            v-if="item.Latitude && item.Longitude"
            :class="{
              'relative flex h-full w-full cursor-pointer items-center justify-center bg-black':
                !isFullscreen,
            }"
            @click="toggle()"
          >
            <MapBase
              :key="`map_${isFullscreen}`"
              :center="getItemCenterCoordinates(item)"
              :markers="getItemMarkersCoordinates(item)"
              :height="isFullscreen ? '100%' : '100px'"
              :hide-controls="!isFullscreen"
              :class="{
                'pointer-events-none opacity-70': !isFullscreen,
              }"
              :zoom="12"
            />
            <IconExpanded
              v-if="!isFullscreen"
              class="absolute z-[999] text-white transition-all group-hover:scale-125"
            />
          </div>
          <div v-else>Missing coordinates</div>
        </UseFullscreen>
      </TableCell>
      <TableCell>{{ item.Latitude }}</TableCell>
      <TableCell>{{ item.Longitude }}</TableCell>
      <TableCell>{{ item.Altitude }}</TableCell>
      <TableCell>{{ item.AltitudeUnitofMeasure }}</TableCell>
    </template>
    <template #noItems>No GPS Point has been added yet.</template>
    <template #addItems>
      <EditListAddButton
        :text="'Add new GPS Point'"
        @click="addNewGpsPoint()"
      />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import UseFullscreen from '../../../../../components/fullscreen/UseFullscreen.vue';
import IconExpanded from '../../../../../components/svg/IconExpanded.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import MapBase from '../../../../../components/map/MapBase.vue';
import { Marker } from '../../../../../components/map/types';
import { GpsInfoEntry } from './types';
import { PointExpression } from 'leaflet';

const props = defineProps<{ items: GpsInfoEntry[] }>();

const { navigateToTab } = useInjectNavigation();

const { addEmptyItem } = useInjectActionTriggers();

const addNewGpsPoint = () => {
  addEmptyItem();
  navigateToTab(props.items.length);
};

const getItemCenterCoordinates = (item: GpsInfoEntry) => {
  return [item.Latitude, item.Longitude] as PointExpression;
};

const getItemMarkersCoordinates = (item: GpsInfoEntry) => {
  return [
    {
      position: {
        lat: item.Latitude,
        lng: item.Longitude,
      },
    },
  ] as Marker[];
};
</script>
