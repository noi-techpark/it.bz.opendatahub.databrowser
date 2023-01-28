<template>
  <EditListTable :items="tags" :hide-tab-link="true">
    <template #colGroup>
      <col class="w-32 md:w-80" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Tag name</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }: { item: string, index: number }">
      <TableCell>
        <SelectWithOptionsCell
          :options="getOptionsForTag(item, tagSet)"
          :value="item"
          :show-empty-value="item == null"
          :editable="editable"
          @update="updateItem(index, $event.value)"
        />
      </TableCell>
    </template>
    <template #noItems>No tags have been defined yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new tag'" @click="addItems([undefined])" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import { SelectOption } from '../../../../../components/select/types';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';

const props = defineProps<{
  tags: string[];
  options: SelectOption[];
  unique: boolean;
}>();

const { tags, unique } = toRefs(props);

const { addItems, updateItem } = useInjectActionTriggers();

const { editable } = useInjectEditMode();

const tagSet = computed(() => new Set(tags.value));

const getOptionsForTag = (tag: string, tagSet: Set<string>) => {
  const allOptions = props.options.map((option) => ({
    ...option,
    selected: tag === option.value,
  }));

  // If the unique option is set, we need to filter out options that are already selected
  if (unique.value) {
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
