<template>
  <EditListTable :items="items" :hide-tab-link="true">
    <template #colGroup>
      <col class="w-32 md:w-80" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Tag name</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }: { item: string, index: number }">
      <TableCell>
        <InputReferenceCell
          :url="url"
          :key-selector="'Id'"
          :label-selector="'TagName.{language}'"
          :value="item"
          :empty-allowed="true"
          :editable="editable"
          @update="updateItem(index, $event.value)"
        />
      </TableCell>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new tag'" @click="addItems([undefined])" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import InputReferenceCell from '../inputReferenceCell/InputReferenceCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

defineProps<{
  items: string[];
  url: string;
  editable?: boolean;
}>();

const { addItems, updateItem } = useInjectActionTriggers();

const { editable } = useInjectEditMode();
</script>
