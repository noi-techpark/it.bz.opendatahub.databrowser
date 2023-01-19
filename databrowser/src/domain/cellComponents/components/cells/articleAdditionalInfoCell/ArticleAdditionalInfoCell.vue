<template>
  <EditListCell :items="infosAsList" :editable="editable">
    <template #table="{ items }">
      <ArticleLinkInfoTable
        :items="items"
        :editable="editable"
        @update="update"
      />
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
  editable?: boolean;
}>();

const infosAsList = computed<Record<string, unknown>[]>(() =>
  Object.entries(props.infos ?? {}).map(([header, content]) => ({
    header,
    content,
  }))
);

const update = (infos: { header: string; content: string }[]) => {
  // Compute single object as necessary for type ODH ArticleLinkInfo
  const value = infos.reduce(
    (prev, curr) => ({ ...prev, [curr.header]: curr.content }),
    {}
  );

  emit('update', { prop: 'infos', value });
};
</script>
