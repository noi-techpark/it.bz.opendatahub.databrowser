<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="roomVenue">
    <template #table="{ items }">
      <EditRoomVenueTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditRoomVenueTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditRoomVenueTab from './EditRoomVenueTab.vue';
import EditRoomVenueTable from './EditRoomVenueTable.vue';
import { RoomVenueEntry } from './types';

defineProps<{ roomVenue?: RoomVenueEntry[] | null }>();
</script>
