<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="items">
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <template #table="{ items }">
      <ArrayEditableTable :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import ArrayEditableTable from './ArrayEditableTable.vue';

withDefaults(
  defineProps<{
    items?: string[] | null;
  }>(),
  {
    items: () => [],
  }
);
</script>
