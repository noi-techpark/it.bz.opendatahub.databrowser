<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>
    <template #tableHeader>
      <TableHeaderCell>URL</TableHeaderCell>
      <TableHeaderCell>Language</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }: { item: FileEntry, index: number }">
      <TableCell>
        <UrlCell :text="item.src" :editable="false" />
      </TableCell>
      <TableCell>
        <SelectWithOptionsCell
          :value="item.language"
          :editable="editable"
          :options="getLanguageOptionsForFile(item.language)"
          :show-search-when-at-least-count-options="Number.POSITIVE_INFINITY"
          @update="updateItem(index, { language: $event.value })"
        />
      </TableCell>
    </template>
    <template #noItems>No files have been uploaded yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new PDF'" @click="navigateToAdd" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';
import UrlCell from '../UrlCell/UrlCell.vue';
import { FileEntry } from './types';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { getLanguageOptionsForFile } from './utils';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

defineProps<{ items: FileEntry[] }>();

const { navigateToAdd } = useInjectNavigation();

const { editable } = useInjectEditMode();

const { updateItem } = useInjectActionTriggers();
</script>
