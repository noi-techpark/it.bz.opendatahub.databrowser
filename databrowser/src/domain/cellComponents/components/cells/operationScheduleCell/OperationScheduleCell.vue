<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="operationSchedules">
    <template #table="{ items }">
      <OperationScheduleTable :items="items" />
    </template>
    <template #tab="{ items }">
      <OperationScheduleTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import OperationScheduleTable from './OperationScheduleTable.vue';
import OperationScheduleTab from './OperationScheduleTab.vue';
import { OperationScheduleEntry } from './types';

defineProps<{ operationSchedules?: OperationScheduleEntry[] | null }>();
</script>
