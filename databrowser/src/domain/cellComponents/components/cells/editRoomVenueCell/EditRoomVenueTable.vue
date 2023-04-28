<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Room name</TableHeaderCell>
      <TableHeaderCell>Indoor</TableHeaderCell>
      <TableHeaderCell>SquareMeters</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
      <TableCell>{{ item.Shortname }} </TableCell>
      <TableCell>{{ item.Indoor }} </TableCell>
      <TableCell>{{ item.SquareMeters }} </TableCell>
    </template>
    <template #noItems>No rooms have been defined yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new room'" @click="addEmptyItem" />
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
import { RoomVenueEntry } from './types';

defineProps<{ items: RoomVenueEntry[] }>();

const { addEmptyItem } = useInjectActionTriggers();
</script>
