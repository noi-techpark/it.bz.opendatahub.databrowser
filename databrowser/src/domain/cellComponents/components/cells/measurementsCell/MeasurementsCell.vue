<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="data">
    <template #table="{ items }">
      <MeasurementsCellTable :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import MeasurementsCellTable from './MeasurementsCellTable.vue';
import { DataEntry } from './types';

defineProps<{ data?: DataEntry[] | null }>();
</script>
