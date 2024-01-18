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
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>tdescription</TableHeaderCell>
      <TableHeaderCell>tname</TableHeaderCell>
      <TableHeaderCell>ttype</TableHeaderCell>
      <TableHeaderCell>tunit</TableHeaderCell>
      <TableHeaderCell>tmetadata</TableHeaderCell>
      <TableHeaderCell>mvalue</TableHeaderCell>
      <TableHeaderCell>mvalidtime</TableHeaderCell>
      <TableHeaderCell>mperiod</TableHeaderCell>
    </template>

    <template #tableCols="{ item }: { item: DataEntry }">
      <TableCell>{{ item.tdescription }}</TableCell>
      <TableCell>{{ item.tname }}</TableCell>
      <TableCell>{{ item.ttype }}</TableCell>
      <TableCell>{{ item.tunit }}</TableCell>
      <TableCell>{{ item.tmetadata }}</TableCell>
      <TableCell>{{ item.mvalue }}</TableCell>
      <TableCell>
        <EditedDateCell
          :date="item.mvalidtime"
          :format="DEFAULT_DATE_TIME_FORMAT"
        />
      </TableCell>
      <TableCell>{{ item.mperiod }}</TableCell>
    </template>
    <template #noItems>No webcams have been defined yet</template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableCell from '../../../../../components/table/TableCell.vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import { DEFAULT_DATE_TIME_FORMAT } from '../../../../../config/utils';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditedDateCell from '../editedDateCell/EditedDateCell.vue';
import { DataEntry } from './types';

defineProps<{ items: DataEntry[] }>();
</script>
