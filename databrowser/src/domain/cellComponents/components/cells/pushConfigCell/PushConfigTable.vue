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
    </template>

    <template #tableHeader>
      <TableHeaderCell>BaseUrl</TableHeaderCell>
      <TableHeaderCell>PathParam</TableHeaderCell>
      <TableHeaderCell>PushApiUrl</TableHeaderCell>
    </template>

    <template #tableCols="{ item }: { item: PushConfigEntry }">
      <TableCell>
        <StringCell :text="item.baseurl" :editable="editable" />
      </TableCell>
      <TableCell>
        <ArrayEditableCell :items="item.pathparam" :editable="editable" />
      </TableCell>
      <TableCell>
        <UrlCell :text="item.pushapiurl" />
      </TableCell>
    </template>
    <template #noItems>No pushconfig have been defined yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new Pushconfig'" @click="addItem({})" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { PushConfigEntry } from './types';
import UrlCell from '../UrlCell/UrlCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import ArrayEditableCell from '../arrayCell/ArrayEditableCell.vue';

defineProps<{ items: PushConfigEntry[] }>();

const { addItem } = useInjectActionTriggers<PushConfigEntry>();

const { editable } = useInjectEditMode();
</script>
