<template>
  <EditListCell :items="odhTagsAsRecord" :editable="editable">
    <template #table="{ items }">
      <OdhTagTable
        v-if="url"
        :items="items"
        :url="url"
        :editable="editable"
        @update="update"
      />
      <div v-else>
        <AlertError
          title="Can not display Open Data Hub Tags, no URL defined"
          content="This seems to be a configuration problem. Please contact  support@opendatahub.com"
        />
      </div>
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import OdhTagTable from './OdhTagTable.vue';

const emit = defineEmits(['update']);

const props = defineProps<{
  odhTags?: string[] | null;
  url?: string;
  editable?: boolean;
}>();

const odhTagsAsRecord = computed(() => {
  if (props.odhTags == null) {
    return [];
  }

  return props.odhTags.map((tag) => ({ tag }));
});

const update = (tags: { tag: string }[]) => {
  const value = tags.reduce<string[]>((prev, curr) => [...prev, curr.tag], []);
  emit('update', { prop: 'odhTags', value });
};
</script>
