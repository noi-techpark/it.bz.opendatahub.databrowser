<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="recordAsItems" @update="update">
    <template #table="{ items }">
      <DictionaryTable :dictitems="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useRecordSupportForCell } from '../../utils/editList/support/useRecordSupport';
import DictionaryTable from './DictionaryTable.vue';
import { DictionaryEntry } from './types';

const emit = defineEmits(['update']);

const props = defineProps<{ dictitems?: Record<string, string> | null }>();

const { dictitems } = toRefs(props);

const { recordAsItems, update } = useRecordSupportForCell<
  string,
  DictionaryEntry
>({
  record: dictitems,
  prop: 'dictitems',
  mapRecordToItems: (record) =>
    Object.entries(record).map(([key, value]) => ({ key, value })),
  mapUpdateToRecord: (items) =>
    items.reduce((prev, curr) => ({ ...prev, [curr.key]: curr.value }), {}),
  emit,
});
</script>
