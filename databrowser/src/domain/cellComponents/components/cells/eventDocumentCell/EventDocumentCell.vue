<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="files" @update="updateWithCurrentLanguage">
    <template #table="{ items }">
      <EventDocumentTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EventDocumentTab type="pdf" :items="items" />
    </template>
    <template #add>
      <EditListUpload type="pdf" has-language-dialog />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { useDatasetQueryStore } from '../../../../datasets/location/store/datasetQueryStore';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditListUpload from '../../utils/editList/upload/EditListUpload.vue';
import EventDocumentTab from './EventDocumentTab.vue';
import EventDocumentTable from './EventDocumentTable.vue';
import { FileEntry } from './types';

const emit = defineEmits(['update']);

defineProps<{ files?: FileEntry[] }>();

const currentLanguage = useDatasetQueryStore().handle('language');

// Set current language for each file
const updateWithCurrentLanguage = ({ value }: { value?: FileEntry[] }) => {
  const updatedFiles =
    value?.map((file) => ({
      ...file,
      language: currentLanguage,
    })) || [];

  emit('update', { prop: 'items', value: updatedFiles });
};
</script>
