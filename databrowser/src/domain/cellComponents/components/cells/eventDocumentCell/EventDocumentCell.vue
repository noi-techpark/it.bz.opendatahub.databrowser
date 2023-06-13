<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="files">
    <template #table="{ items }">
      <EventDocumentTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EventDocumentTab type="pdf" :items="items" />
    </template>
    <template #add>
      <EditListUpload type="pdf" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EventDocumentTab from './EventDocumentTab.vue';
import EventDocumentTable from './EventDocumentTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditListUpload from '../../utils/editList/upload/EditListUpload.vue';
import { FileEntry } from './types';

defineProps<{ files?: FileEntry[] }>();
</script>
