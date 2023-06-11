<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="images">
    <template #table="{ items }">
      <EditImageGalleryTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditImageGalleryTab :items="items" />
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

defineProps<{ images?: ImageGalleryEntry[] | null }>();
</script>
