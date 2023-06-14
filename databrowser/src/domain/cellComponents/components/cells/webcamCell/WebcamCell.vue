<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="webcams">
    <template #table="{ items }">
      <WebcamTable :items="items" />
    </template>
    <template #tab="{ items }">
      <WebcamTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import WebcamTable from './WebcamTable.vue';
import WebcamTab from './WebcamTab.vue';
import { WebcamEntry } from './types';

defineProps<{ webcams?: WebcamEntry[] | null }>();
</script>
