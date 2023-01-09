<template>
  <EditListTable :items="items" :hide-tab-link="true">
    <template #colGroup>
      <col class="w-32 md:w-80" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Tag name</TableHeaderCell>
    </template>

    <template
      #tableCols="{ item, index }: { item: OdhTagEntry, index: number }"
    >
      <TableCell>
        <InputReferenceCell
          :url="url"
          :key-selector="'Id'"
          :label-selector="'TagName.{language}'"
          :value="item.tag"
          :empty-allowed="true"
          :editable="editable"
          @update="updateEntry(index, $event.value)"
        />
      </TableCell>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new tag'" @click="addEmptyItem" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import {
  useInjectActionHooks,
  useInjectActionTriggers,
} from '../../utils/editList/actions/useActions';
import InputReferenceCell from '../inputReferenceCell/InputReferenceCell.vue';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface OdhTagEntry {
  tag?: string;
}

const emit = defineEmits(['update']);

const props = defineProps<{
  items: OdhTagEntry[];
  url: string;
  editable?: boolean;
}>();

const { addEmptyItem } = useInjectActionTriggers();

const { onAddItems, onDeleteItems, onDuplicateItem, onUpdateItems } =
  useInjectActionHooks();

onAddItems(() => {
  const tags = [...props.items, { tag: '' }];
  emit('update', tags);
});

onDeleteItems((indexes) => {
  const indexesAsSet = new Set(indexes);
  const tags = props.items.filter((link, index) => !indexesAsSet.has(index));
  emit('update', tags);
});

onDuplicateItem((index: number) => {
  const duplicatedEntry = { ...props.items[index] };

  const tags = [
    ...props.items.slice(0, index + 1),
    { ...duplicatedEntry },
    ...props.items.slice(index + 1),
  ];

  emit('update', tags);
});

onUpdateItems((items) => emit('update', items));

const updateEntry = (index: number, tag: string) => {
  const tags = [...props.items];
  tags[index] = { tag };
  emit('update', tags);
};
</script>
