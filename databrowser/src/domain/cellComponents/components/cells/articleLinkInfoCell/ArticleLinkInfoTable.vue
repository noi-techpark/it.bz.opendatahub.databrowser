<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="links" :hide-tab-link="true" :hide-sortable="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-60" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Link title</TableHeaderCell>
      <TableHeaderCell>Link URL</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }">
      <TableCell>
        <StringCell
          :text="item.title"
          :editable="editable"
          @update="updateItem(index, { title: $event.value, url: item.url })"
        />
      </TableCell>
      <TableCell>
        <StringCell
          :text="item.url"
          :editable="editable"
          @update="updateItem(index, { title: item.title, url: $event.value })"
        />
      </TableCell>
    </template>
    <template #noItems>No links have been defined yet</template>
    <template #addItems>
      <EditListAddButton
        :text="'Add new link'"
        @click="addItems([{ title: '', url: '' }])"
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
import { LinkEntry } from './types';
import { useRecordSupportForTable } from '../../utils/editList/support/useRecordSupport';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

const props = defineProps<{ links: LinkEntry[] }>();

const { links } = toRefs(props);

const { editable } = useInjectEditMode();

const { addItems, updateItem } = useInjectActionTriggers<LinkEntry>();

useRecordSupportForTable<LinkEntry>({
  items: links,
  duplication: (items, index) => ({ ...items[index], title: '' }),
});
</script>
