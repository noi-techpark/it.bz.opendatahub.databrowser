<template>
  <EditListTable :items="infos" :hide-tab-link="true" :hide-sortable="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-64" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Header</TableHeaderCell>
      <TableHeaderCell>Content</TableHeaderCell>
    </template>

    <template #tableCols="{ item, index }: { item: InfoEntry, index: number }">
      <TableCell>
        <SelectWithOptionsCell
          :value="item.header"
          :sort-by-label="false"
          :editable="editable"
          v-bind="headerOptions"
          @update="
            updateItem(index, { header: $event.value, content: item.content })
          "
        />
      </TableCell>
      <TableCell>
        <TextAreaCell
          :text="item.content"
          :rows="5"
          :editable="editable"
          @update="
            updateItem(index, { header: item.header, content: $event.value })
          "
        />
      </TableCell>
    </template>

    <template #addItems>
      <EditListAddButton
        :text="'Add new link'"
        @click="addItems([{ header: '', content: '' }])"
      />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import TextAreaCell from '../textAreaCell/TextAreaCell.vue';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { headerOptions } from './headerOptions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import { InfoEntry } from './types';
import { toRefs } from 'vue';
import { useRecordSupportForTable } from '../../utils/editList/support/useRecordSupport';

const props = defineProps<{ infos: InfoEntry[] }>();

const { infos } = toRefs(props);

const { editable } = useInjectEditMode();

const { addItems, updateItem } = useInjectActionTriggers();

useRecordSupportForTable({
  items: infos,
  duplication: (items, index) => ({ ...items[index], header: '' }),
});
</script>
