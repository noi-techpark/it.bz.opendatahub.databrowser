<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="videos">
    <template #table="{ items }">
      <EditVideoItemsTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditVideoItemsTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditVideoItemsTab from './EditVideoItemsTab.vue';
import EditVideoItemsTable from './EditVideoItemsTable.vue';
import { VideoItemsEntry } from './types';

withDefaults(defineProps<{ videos?: VideoItemsEntry[] | null }>(), {
  videos: () => [],
});
</script>
