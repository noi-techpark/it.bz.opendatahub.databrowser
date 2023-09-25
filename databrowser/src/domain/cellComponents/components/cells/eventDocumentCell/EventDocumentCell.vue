<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="files" @update="updateWithCurrentLanguage">
    <template #dialog="{ items }">
      <DialogMultipleFilesLanguage
        :is-open="isCurrentDialog"
        :items="items"
        @close="closeDialog()"
      />
    </template>

    <template #table="{ items }">
      <EventDocumentTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EventDocumentTab type="pdf" :items="items" @open-dialog="openDialog()" />
    </template>
    <template #add>
      <EditListUpload
        type="pdf"
        has-language-dialog
        @open-dialog="openDialog()"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EventDocumentTab from './EventDocumentTab.vue';
import EventDocumentTable from './EventDocumentTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditListUpload from '../../utils/editList/upload/EditListUpload.vue';
import DialogMultipleFilesLanguage from '../../utils/editList/upload/DialogMultipleFilesLanguage.vue';
import { FileEntry } from './types';
import { useApiQuery } from '../../../../api';

import { useProvideNavigation } from '../../utils/editList/actions/useNavigation';

const emit = defineEmits(['update']);

defineProps<{ files?: FileEntry[] }>();

const { useApiParameter } = useApiQuery();

const { isCurrentDialog, openDialog, closeDialog } = useProvideNavigation();

// Set current language for each file
const updateWithCurrentLanguage = ({ value }: { value?: FileEntry[] }) => {
  const currentLanguage = useApiParameter('language');

  const updatedFiles =
    value?.map((file) => ({
      ...file,
      language: currentLanguage.value,
    })) || [];

  emit('update', { prop: 'items', value: updatedFiles });
};
</script>
