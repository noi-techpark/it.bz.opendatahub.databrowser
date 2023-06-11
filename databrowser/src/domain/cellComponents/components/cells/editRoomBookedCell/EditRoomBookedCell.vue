<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="roomBooked">
    <template #table="{ items }">
      <EditRoomBookedTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditRoomBookedTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditRoomBookedTab from './EditRoomBookedTab.vue';
import EditRoomBookedTable from './EditRoomBookedTable.vue';
import { RoomBookedEntry } from './types';

defineProps<{ roomBooked?: RoomBookedEntry[] | null }>();
</script>
