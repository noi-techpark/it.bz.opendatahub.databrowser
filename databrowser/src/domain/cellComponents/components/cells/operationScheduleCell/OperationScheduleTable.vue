<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-80" />
      <col class="w-32 md:w-60" />
      <col class="w-32 md:w-60" />
      <col class="w-32 md:w-72" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Season name</TableHeaderCell>
      <TableHeaderCell>Season start</TableHeaderCell>
      <TableHeaderCell>Season end</TableHeaderCell>
      <TableHeaderCell>Type</TableHeaderCell>
    </template>

    <template
      #tableCols="{
        item,
        index,
      }: {
        item: OperationScheduleEntry,
        index: number,
      }"
    >
      <TableCell>
        <StringCell
          :text="item.name"
          :editable="editable"
          @input="updateItem(index, { name: $event.target.value })"
        />
      </TableCell>
      <TableCell>
        <DateCell
          :date="item.start"
          :editable="editable"
          type="datetime"
          @update="updateItem(index, { ...item, start: $event.value })"
        />
      </TableCell>
      <TableCell>
        <DateCell
          :date="item.stop"
          :editable="editable"
          type="datetime"
          @update="updateItem(index, { ...item, stop: $event.value })"
        />
      </TableCell>
      <TableCell>
        <SelectWithOptionsCell
          v-if="editable"
          :value="item.type"
          :editable="editable"
          :options="operationScheduleTypeOptions"
          @update="updateItem(index, { ...item, type: $event.value })"
        />
        <span v-else>{{ getOperationScheduleTypeLabel(item.type) }}</span>
      </TableCell>
    </template>
    <template #noItems>No seasons have been defined yet</template>
    <template #addItems>
      <EditListAddButton
        :text="'Add new Season'"
        @click="addItems([{ type: operationScheduleTypeDefaultValue }])"
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
import { OperationScheduleEntry } from './types';
import StringCell from '../stringCell/StringCell.vue';
import DateCell from '../dateCell/DateCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import {
  operationScheduleTypeOptions,
  operationScheduleTypeDefaultValue,
  getOperationScheduleTypeLabel,
} from './operationScheduleOptions';

defineProps<{ items: OperationScheduleEntry[] }>();

const { addItems, updateItem } = useInjectActionTriggers();

const { editable } = useInjectEditMode();
</script>
