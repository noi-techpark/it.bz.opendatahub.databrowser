<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <DialogMultipleFilesLanguage
      :is-open="dialog.isOpen"
      :is-add="true"
      @close="closeDialog()"
    />
    <EditListHeader>
      <EditListBackButton label="Back" @click="navigateToPrevious" />
    </EditListHeader>
    <FileUpload :type="type" :multiple="true" @upload-success="uploadSuccess" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from '../../upload/FileUpload.vue';
import { FileType } from '../../upload/types';
import EditListBackButton from '../EditListBackButton.vue';
import { useInjectActionTriggers } from '../actions/useActions';
import { useInjectNavigation } from '../actions/useNavigation';
import EditListHeader from '../header/EditListHeader.vue';

import { useDatasetQueryStore } from '../../../../../datasets/location/store/datasetQueryStore';
import DialogMultipleFilesLanguage from '../dialogMultipleFilesLanguage/DialogMultipleFilesLanguage.vue';
import {
  clearDialogStore,
  setDialogItems,
} from '../dialogMultipleFilesLanguage/utils';

const props = defineProps<{ type: FileType; hasLanguageDialog?: boolean }>();

const { navigateToPrevious } = useInjectNavigation();

const { addItems } = useInjectActionTriggers();

const dialog = ref({ isOpen: false });

const currentLanguage = useDatasetQueryStore().handle('language');

const uploadSuccess = (urls: string[], fileNames: string[]) => {
  const items = urls.map((url, index) => {
    return {
      src: url,
      name: fileNames[index],
    };
  });

  addItems(items.map((item) => ({ src: item.src })));

  if (props.hasLanguageDialog) {
    setDialogItems(items, currentLanguage.value);
    dialog.value.isOpen = true;
    return;
  }

  navigateToPrevious();
};

const closeDialog = () => {
  clearDialogStore();
  dialog.value.isOpen = false;
  navigateToPrevious();
};
</script>
