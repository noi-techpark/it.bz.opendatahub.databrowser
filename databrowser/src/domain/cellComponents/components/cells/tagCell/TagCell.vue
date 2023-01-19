<template>
  <EditListCell :items="tags">
    <template #table>
      <TagTable
        :tags="tags"
        :options="options"
        :unique="unique"
        v-bind="attrs"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, useAttrs, withDefaults } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useMapper } from './mapper';
import TagTable from './TagTable.vue';

const props = withDefaults(
  defineProps<{
    tags?: string[];
    sortByLabel?: boolean;
    unique?: boolean;
  }>(),
  {
    tags: () => [],
    sortByLabel: true,
  }
);

const { tags, sortByLabel } = toRefs(props);

const attrs = useAttrs();

const { options } = useMapper(ref(attrs), sortByLabel);
</script>
