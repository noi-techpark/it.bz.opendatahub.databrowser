<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Date start</TableHeaderCell>
      <TableHeaderCell>Time start</TableHeaderCell>
      <TableHeaderCell>Date end</TableHeaderCell>
      <TableHeaderCell>Time end</TableHeaderCell>
      <TableHeaderCell>Room name</TableHeaderCell>
      <TableHeaderCell>Subtitle</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
      <TableCell>{{ item.startDate }}</TableCell>
      <TableCell>{{ item.startDate }}</TableCell>
      <TableCell>{{ item.endDate }}</TableCell>
      <TableCell>{{ item.endDate }}</TableCell>
      <TableCell>{{ item.spaceDesc }}</TableCell>
      <TableCell>{{ item.subtitle }}</TableCell>
      <TableCell>{{ item.spaceType }}</TableCell>
    </template>

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

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface RoomBookedEntry {
  space?: string;
  spaceDesc?: string;
  spaceAbbrev?: string;
  spaceType?: string;
  subtitle?: string;
  comment?: string;
  startDate?: string;
  endDate?: string;
  startDateUTC?: number;
  endDateUTC?: number;
  spaceDescRoomMapping?: string;
}

defineProps<{ items: RoomBookedEntry[] }>();

const { addEmptyItem } = useInjectActionTriggers();
</script>
