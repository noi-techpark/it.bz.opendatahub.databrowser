<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="dictitems" :hide-tab-link="true" :hide-sortable="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-60" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Key</TableHeaderCell>
      <TableHeaderCell>Value</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }">
      <TableCell>
        <StringCell
          :text="item.key"
          :editable="editable"
          @update="updateItem(index, { key: $event.value, value: item.value })"
        />
      </TableCell>
      <TableCell>
        <StringCell
          :text="item.value"
          :editable="editable"
          @update="updateItem(index, { key: item.key, value: $event.value })"
        />
      </TableCell>
    </template>
    <template #noItems>No items have been defined yet</template>
    <template #addItems>
      <EditListAddButton
        :text="'Add new item'"
        @click="addItems([{ key: '' }])"
      />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import StringCell from '../stringCell/StringCell.vue';
import { DictionaryEntry } from './types';
import { useRecordSupportForTable } from '../../utils/editList/support/useRecordSupport';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

const props = defineProps<{ dictitems: DictionaryEntry[] }>();

const { dictitems } = toRefs(props);

const { editable } = useInjectEditMode();

const { addItems, updateItem } = useInjectActionTriggers();

useRecordSupportForTable<DictionaryEntry>({
  items: dictitems,
  duplication: (items, index) => ({ ...items[index], key: '' }),
});
</script>
