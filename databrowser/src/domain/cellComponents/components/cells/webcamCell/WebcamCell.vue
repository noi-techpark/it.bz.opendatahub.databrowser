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
import { defineProps } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import WebcamTable from './WebcamTable.vue';
import WebcamTab from './WebcamTab.vue';

defineProps<{ webcams?: Record<string, unknown>[] }>();
</script>
