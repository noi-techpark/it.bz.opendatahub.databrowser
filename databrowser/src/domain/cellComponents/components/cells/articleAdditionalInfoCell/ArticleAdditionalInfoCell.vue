<template>
  <EditListCell :items="infosAsList" @update="update">
    <template #table="{ items }">
      <ArticleLinkInfoTable :infos="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import ArticleLinkInfoTable from './ArticleAdditionalInfoTable.vue';

const emit = defineEmits(['update']);

const props = defineProps<{
  infos?: Record<string, string> | null;
}>();

const infosAsList = computed<Record<string, unknown>[]>(() =>
  Object.entries(props.infos ?? {}).map(([header, content]) => ({
    header,
    content,
  }))
);

const update = (event: {
  prop: string;
  value: { header: string; content: string }[];
}) => {
  console.log('update2', event);
  const value = event.value.reduce(
    (prev, curr) => ({ ...prev, [curr.header]: curr.content }),
    {}
  );

  emit('update', { prop: 'infos', value });
};
</script>
