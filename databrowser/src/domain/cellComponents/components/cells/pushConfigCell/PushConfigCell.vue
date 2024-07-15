<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="pushconfigs">
    <template #table="{ items }">
      <PushConfigTable :items="items" />
    </template>
    <template #tab="{ items }">
      <PushConfigTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import PushConfigTable from './PushConfigTable.vue';
import PushConfigTab from './PushConfigTab.vue';
import { PushConfigEntry } from './types';

defineProps<{ pushconfigs?: PushConfigEntry[] | null }>();
</script>
