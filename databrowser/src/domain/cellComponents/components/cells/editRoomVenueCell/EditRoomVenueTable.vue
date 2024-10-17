<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-52 md:w-52" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Room name</TableHeaderCell>
      <TableHeaderCell>Indoor</TableHeaderCell>
      <TableHeaderCell>SquareMeters</TableHeaderCell>
      <TableHeaderCell>Capacity</TableHeaderCell>
      <TableHeaderCell>Setup Type</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
      <TableCell>{{ item.Shortname }} </TableCell>
      <TableCell>
        <ToggleTriStateCell
          :enabled="booleanOrStringToBoolean(item.Indoor)"
          :editable="true"
        />
      </TableCell>
      <TableCell>{{ item.SquareMeters }} </TableCell>
      <TableCell>{{ item.Capacity }} </TableCell>
      <TableCell>{{ item.SetupType }} </TableCell>
    </template>
    <template #noItems>No rooms have been defined yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new room'" @click="addItem({})" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableCell from '../../../../../components/table/TableCell.vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import ToggleTriStateCell from '../toggleCell/ToggleTriStateCell.vue';
import { RoomVenueEntry } from './types';

defineProps<{ items: RoomVenueEntry[] }>();

const { addItem } = useInjectActionTriggers<RoomVenueEntry>();
</script>
