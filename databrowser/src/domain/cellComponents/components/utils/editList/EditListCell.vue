<template>
  <section>
    <!-- Slot for table visualization -->
    <slot v-if="isCurrentTable" name="table" :items="itemsInternal"></slot>

    <!-- Slot for tab visualization -->
    <slot v-if="isCurrentTab" name="tab" :items="itemsInternal"></slot>

    <!-- Slot for add visualization (e.g. upload) -->
    <slot v-if="isCurrentAdd" name="add"></slot>
  </section>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { useProvideActions } from './actions/useActions';
import { useProvideNavigation } from './actions/useNavigation';
import { useProvideEditMode } from './actions/useEditMode';

const emit = defineEmits(['update']);

const props = defineProps<{
  items?: Record<string, unknown>[];
  isEditMode?: boolean;
}>();

// Use internal copy of items for quicker operations (e.g. sorting)
// The internal copy is also updated in case the items prop updates
const itemsInternal = computed(() => props.items ?? []);

// Provide navigation to this component and the component's descendants
const {
  isCurrentAdd,
  isCurrentTab,
  isCurrentTable,
  navigateToTab,
  navigateToTable,
  setActiveTab,
} = useProvideNavigation();

// Provide action handling to this component and the component's descendants
const {
  onAddItems,
  onDeleteAllItems,
  onDeleteItems,
  onDuplicateItem,
  onUpdateItem,
  onUpdateItems,

  updateItems,
} = useProvideActions();

const isEditMode = computed(() => props.isEditMode === true);
useProvideEditMode(isEditMode);

onAddItems((items: unknown[]) => {
  const newItems = [...itemsInternal.value, ...(items ?? [])];
  updateItems(newItems);
  setActiveTab(newItems.length - 1);
});

onDeleteItems((indexes: number[]) => {
  const indexSet = new Set(indexes);
  const remainingItems = itemsInternal.value.filter(
    (img, index) => !indexSet.has(index)
  );
  updateItems(remainingItems);
});

onDeleteAllItems(() => {
  updateItems([]);
  navigateToTable();
});

onDuplicateItem((index: number) => {
  const duplicatedEntry = { ...itemsInternal.value[index] };

  const newItems = [
    ...itemsInternal.value.slice(0, index + 1),
    duplicatedEntry,
    ...itemsInternal.value.slice(index + 1),
  ];

  updateItems(newItems);

  if (isCurrentTab.value) {
    navigateToTab(index + 1);
  }
});

onUpdateItem(({ index, item }) => {
  const items = [...itemsInternal.value];
  items[index] = { ...items[index], ...item };
  updateItems(items);
});

onUpdateItems((items: unknown[]) => {
  emit('update', { prop: 'items', value: items });
});
</script>
