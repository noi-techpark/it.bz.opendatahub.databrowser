<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="gpsInfo">
    <template #table="{ items }">
      <EditGpsInfoTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditGpsInfoTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditGpsInfoTab from './EditGpsInfoTab.vue';
import EditGpsInfoTable from './EditGpsInfoTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { GpsInfoEntry } from './types';

withDefaults(
  defineProps<{
    gpsInfo?: GpsInfoEntry[] | null;
  }>(),
  {
    gpsInfo: () => [],
  }
);
</script>
