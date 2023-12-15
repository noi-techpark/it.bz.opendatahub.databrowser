<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="relatedcontent">
    <template #table="{ items }">
      <RelatedContentTable :items="items" />
    </template>
    <template #tab="{ items }">
      <RelatedContentTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import EditListCell from '../../utils/editList/EditListCell.vue';
import RelatedContentTable from './RelatedContentTable.vue';
import RelatedContentTab from './RelatedContentTab.vue';
import { RelatedContentEntry } from './types';

defineProps<{ relatedcontent?: RelatedContentEntry[] | null }>();
</script>
