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
import { defineProps } from 'vue';
import EditImageGalleryTab from './EditImageGalleryTab.vue';
import EditImageGalleryTable from './EditImageGalleryTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditListUpload from '../../utils/editList/upload/EditListUpload.vue';

defineProps<{ images?: Record<string, unknown>[] | null }>();
</script>
