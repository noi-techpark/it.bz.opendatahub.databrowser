<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListDocumentLanguagesTable
    :items="items"
    hide-sortable
    hide-tab-link
    has-body-scrollable
    label-key="language"
  >
    <template #colGroup>
      <col class="w-32 md:w-60" />
    </template>
    <template #tableHeader>
      <TableHeaderCell>Document Name</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }: { item: FileEntry, index: number }">
      <TableCell>
        <StringCell
          :text="item.documentName"
          :editable="true"
          @update="
            updateItem(index, {
              documentName: $event.value,
              language: item.language,
            })
          "
        />
      </TableCell>
    </template>
    <template #noItems>No files have been uploaded yet</template>
  </EditListDocumentLanguagesTable>
</template>

<script setup lang="ts">
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';

import EditListDocumentLanguagesTable from '../../utils/editList/table/EditListDocumentLanguagesTable.vue';
import StringCell from '../stringCell/StringCell.vue';
import { FileEntry } from './types';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useProvideEditMode } from '../../utils/editList/actions/useEditMode';

import { ref } from 'vue';

const isEditable = ref(true);
defineProps<{ items: FileEntry[] }>();
useProvideEditMode(isEditable);

const { updateItem } = useInjectActionTriggers();
</script>
