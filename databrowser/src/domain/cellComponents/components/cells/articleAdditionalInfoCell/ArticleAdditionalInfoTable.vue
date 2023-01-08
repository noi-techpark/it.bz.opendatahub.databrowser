<template>
  <EditListTable :items="items" :hide-tab-link="true" :hide-sortable="true">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-64" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Header</TableHeaderCell>
      <TableHeaderCell>Content</TableHeaderCell>
    </template>

    <template
      #tableCols="{ item, index }: { item: Required<InfoEntry>, index: number }"
    >
      <TableCell>
        <SelectWithOptionsCell
          :value="item.header"
          :sort-by-label="false"
          :editable="editable"
          v-bind="headerOptions"
          @update="updateEntry(index, $event.value, item.content)"
        />
      </TableCell>
      <TableCell>
        <TextAreaCell
          :text="item.content"
          :rows="5"
          :editable="editable"
          @update="updateEntry(index, item.header, $event.value)"
        />
      </TableCell>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new link'" @click="addEntry" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionHooks } from '../../utils/editList/actions/useActions';
import TextAreaCell from '../textAreaCell/TextAreaCell.vue';
import SelectWithOptionsCell from '../selectWithOptionsCell/SelectWithOptionsCell.vue';
import { headerOptions } from './headerOptions';

interface InfoEntry {
  header?: string;
  content?: string;
}

const emit = defineEmits(['update']);

const props = defineProps<{ items: InfoEntry[]; editable?: boolean }>();

const addEntry = () => {
  const links = [...props.items, { header: '', content: '' }];
  emit('update', links);
};

const updateEntry = (index: number, header: string, content: string) => {
  const links = [...props.items];
  links[index] = { header, content };
  emit('update', links);
};

const { onDeleteItems, onDuplicateItem, onUpdateItems } =
  useInjectActionHooks();

onDeleteItems((indexes) => {
  const indexesAsSet = new Set(indexes);
  const links = props.items.filter((link, index) => !indexesAsSet.has(index));
  emit('update', links);
});

onUpdateItems((items) => emit('update', items));

onDuplicateItem((index: number) => {
  const duplicatedEntry = { ...props.items[index] };

  const links = [
    ...props.items.slice(0, index + 1),
    {
      ...duplicatedEntry,
      header: duplicatedEntry.header + '-' + new Date().getTime(),
    },
    ...props.items.slice(index + 1),
  ];

  emit('update', links);
});
</script>
