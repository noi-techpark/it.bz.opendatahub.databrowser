<template>
  <EditListTable :items="tags" :hide-tab-link="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Name</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }">
      <TableCell>
        <SelectWithOptionsCell
          :options="getOptionsForTag(item, tagSet)"
          :value="item"
          :sort-by-label="false"
          :editable="editable"
          v-bind="attrs"
          @update="updateItem(index, $event.value)"
        />
      </TableCell>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new Tag'" @click="addItems([undefined])" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { computed, defineProps, useAttrs } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { SelectOption } from '../../../../../components/select/types';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
export interface TagEntry {
  tag: string;
}

const props = defineProps<{
  tags: string[];
  options: SelectOption[];
  unique?: boolean;
}>();

const { editable } = useInjectEditMode();

const attrs = useAttrs();

const { addItems, updateItem } = useInjectActionTriggers();

const tagSet = computed(() => new Set(props.tags));

const getOptionsForTag = (tag: string, tagSet: Set<string>) => {
  const allOptions = props.options.map((option) => ({
    ...option,
    selected: tag === option.value,
  }));

  // If the unique option is set, we need to filter out options that are already selected
  if (props.unique) {
    return allOptions.filter(
      (option) =>
        // Filter out options that are already selected, except for the current tag
        option.selected || option.value == null || !tagSet.has(option.value)
    );
  }

  // If the unique option is not set, we can just return all options
  return allOptions;
};
</script>