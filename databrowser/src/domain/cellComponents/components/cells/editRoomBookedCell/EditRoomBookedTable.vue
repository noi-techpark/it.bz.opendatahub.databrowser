<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-44" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-24" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Date start</TableHeaderCell>
      <TableHeaderCell>Date end</TableHeaderCell>
      <TableHeaderCell>Room name</TableHeaderCell>
      <TableHeaderCell>Subtitle</TableHeaderCell>
      <TableHeaderCell>Location</TableHeaderCell>
      <TableHeaderCell>Comment</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
      <TableCell>
        <DateCell
          :editable="false"
          :date="item.startDate"
          :format="DEFAULT_DATE_TIME_FORMAT"
        />
      </TableCell>
      <TableCell>
        <DateCell
          :editable="false"
          :date="item.endDate"
          :format="DEFAULT_DATE_TIME_FORMAT"
        />
      </TableCell>
      <TableCell>{{ item.spaceDesc }} </TableCell>
      <TableCell>{{ item.subtitle }} </TableCell>
      <TableCell>{{ item.spaceType }} </TableCell>
      <TableCell>{{ item.comment }} </TableCell>
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
import { RoomBookedEntry } from './types';
import DateCell from '../dateCell/DateCell.vue';
import { DEFAULT_DATE_TIME_FORMAT } from '../../../../../config/utils';

defineProps<{ items: RoomBookedEntry[] }>();

const { addEmptyItem } = useInjectActionTriggers();
</script>
