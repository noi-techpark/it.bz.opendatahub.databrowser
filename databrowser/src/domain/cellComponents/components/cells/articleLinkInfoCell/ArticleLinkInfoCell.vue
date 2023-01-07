<template>
  <EditListCell :items="linksAsList" :editable="editable">
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
import ArticleLinkInfoTable from './ArticleLinkInfoTable.vue';

const emit = defineEmits(['update']);

const props = defineProps<{
  links?: Record<string, string>;
  editable?: boolean;
}>();

const linksAsList = computed<Record<string, unknown>[]>(() =>
  Object.entries(props.links ?? {}).map(([title, url]) => ({ title, url }))
);

const update = (links: { title: string; url: string }[]) => {
  // Compute single object as necessary for type ODH ArticleLinkInfo
  const value = links.reduce(
    (prev, curr) => ({ ...prev, [curr.title]: curr.url }),
    {}
  );

  emit('update', { prop: 'links', value });
};
</script>
