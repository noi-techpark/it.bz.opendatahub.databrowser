<template>
  <EditListTable :items="items" :hide-tab-link="true" :hide-sortable="true">
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
          @update="updateEntry(index, $event.value, item.url)"
        />
      </TableCell>
      <TableCell>
        <StringCell
          :text="item.url"
          :editable="editable"
          @update="updateEntry(index, item.title, $event.value)"
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
import StringCell from '../stringCell/StringCell.vue';

interface LinkEntry {
  title?: string;
  url?: string;
}

const emit = defineEmits(['update']);

const props = defineProps<{ items: LinkEntry[]; editable?: boolean }>();

const addEntry = () => {
  const links = [...props.items, { title: '', url: '' }];
  emit('update', links);
};

const updateEntry = (index: number, title: string, url: string) => {
  const links = [...props.items];
  links[index] = { title, url };
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
      title: duplicatedEntry.title + '-' + new Date().getTime(),
    },
    ...props.items.slice(index + 1),
  ];

  emit('update', links);
});
</script>
