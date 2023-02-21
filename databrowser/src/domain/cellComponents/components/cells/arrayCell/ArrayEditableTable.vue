<template>
  <EditListTable :items="items" :hide-tab-link="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Name</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }">
      <TableCell>
        <StringCell
          :text="item"
          :editable="editable"
          @update="updateItem(index, $event.value)"
        />
      </TableCell>
    </template>
    <template #noItems>No items have been defined yet</template>
    <template #addItems>
      <EditListAddButton
        :text="'Add new item'"
        @click="addItems([undefined])"
      />
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
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import StringCell from '../stringCell/StringCell.vue';

defineProps<{ items: string[] }>();

const { editable } = useInjectEditMode();

const { addItems, updateItem } = useInjectActionTriggers();
</script>
