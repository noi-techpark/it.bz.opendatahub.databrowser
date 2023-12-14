<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="images">
    <template #table="{ items }">
      <EditImageGalleryTable
        :items="items"
        :resize-images="resizeImagesAsBoolean"
      />
    </template>
    <template #tab="{ items }">
      <EditImageGalleryTab
        :items="items"
        :resize-images="resizeImagesAsBoolean"
      />
    </template>
    <template #add>
      <EditListUpload type="image" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditImageGalleryTab from './EditImageGalleryTab.vue';
import EditImageGalleryTable from './EditImageGalleryTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditListUpload from '../../utils/editList/upload/EditListUpload.vue';
import { ImageGalleryEntry } from './types';
import { computed } from 'vue';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';

const props = withDefaults(
  defineProps<{
    images?: ImageGalleryEntry[] | null;
    resizeImages?: string | boolean;
  }>(),
  {
    images: () => [],
    resizeImages: 'true',
  }
);

const resizeImagesAsBoolean = computed(() =>
  booleanOrStringToBoolean(props.resizeImages)
);
</script>
