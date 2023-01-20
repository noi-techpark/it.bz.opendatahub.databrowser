<template>
  <EditListCell :items="recordAsItems" @update="update">
    <template #table="{ items }">
      <ArticleLinkInfoTable :infos="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useRecordSupportForCell } from '../../utils/editList/support/useRecordSupport';
import ArticleLinkInfoTable from './ArticleAdditionalInfoTable.vue';
import { InfoEntry } from './types';

const emit = defineEmits(['update']);

const props = defineProps<{ infos?: Record<string, string> | null }>();

const { infos } = toRefs(props);

const { recordAsItems, update } = useRecordSupportForCell<string, InfoEntry>({
  record: infos,
  prop: 'infos',
  mapRecordToItems: (record: Record<string, string>) =>
    Object.entries(record).map(([header, content]) => ({ header, content })),
  mapUpdateToRecord: (items: InfoEntry[]) =>
    items.reduce(
      (prev, curr) => ({ ...prev, [curr.header]: curr.content }),
      {}
    ),
  emit,
});
</script>
