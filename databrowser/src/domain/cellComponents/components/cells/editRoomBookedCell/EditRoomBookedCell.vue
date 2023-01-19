<template>
  <EditListCell :items="roomBooked">
    <template #table="{ items }">
      <EditRoomBookedTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditRoomBookedTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditRoomBookedTab from './EditRoomBookedTab.vue';
import EditRoomBookedTable from './EditRoomBookedTable.vue';

defineProps<{ roomBooked?: Record<string, unknown>[] | null }>();
</script>
