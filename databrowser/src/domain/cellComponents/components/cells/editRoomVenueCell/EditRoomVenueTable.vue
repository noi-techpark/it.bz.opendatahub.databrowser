<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
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
        <ToggleCell
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
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { RoomVenueEntry } from './types';
import ToggleCell from '../toggleCell/ToggleCell.vue';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';

defineProps<{ items: RoomVenueEntry[] }>();

const { addItem } = useInjectActionTriggers<RoomVenueEntry>();
</script>
