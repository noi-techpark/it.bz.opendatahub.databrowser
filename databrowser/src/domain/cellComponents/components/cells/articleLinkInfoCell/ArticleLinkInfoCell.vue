<template>
  <EditListCell :items="recordAsItems" @update="update">
    <template #table="{ items }">
      <ArticleLinkInfoTable :links="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useRecordSupportForCell } from '../../utils/editList/support/useRecordSupport';
import ArticleLinkInfoTable from './ArticleLinkInfoTable.vue';
import { LinkEntry } from './types';

const emit = defineEmits(['update']);

const props = defineProps<{ links?: Record<string, string> | null }>();

const { links } = toRefs(props);

const { recordAsItems, update } = useRecordSupportForCell<string, LinkEntry>({
  record: links,
  prop: 'links',
  mapRecordToItems: (record) =>
    Object.entries(record).map(([title, url]) => ({ title, url })),
  mapUpdateToRecord: (items) =>
    items.reduce((prev, curr) => ({ ...prev, [curr.title]: curr.url }), {}),
  emit,
});
</script>
