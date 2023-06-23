<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
          :editable="editable"
          v-bind="attrs"
          @update="updateItem(index, $event.value)"
        />
      </TableCell>
    </template>
    <template #noItems>No tags have been defined yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new'" @click="addItems([undefined])" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { SelectOption } from '../../../../../components/select/types';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

const props = defineProps<{
  tags: string[];
  options: SelectOption[];
  unique?: boolean;
}>();

const { editable } = useInjectEditMode();

const attrs = useAttrs();

const { addItems, updateItem } = useInjectActionTriggers();

const tagSet = computed(() => new Set(props.tags));

const getOptionsForTag = (tag: string, tagSet: Set<string | number>) => {
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
