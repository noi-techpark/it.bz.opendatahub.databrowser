<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <section>
    <!-- Slot for table visualization -->
    <slot
      v-if="isCurrentTable"
      name="table"
      :items="(itemsInternal as any[])"
    ></slot>

    <!-- Slot for tab visualization -->
    <slot
      v-if="isCurrentTab"
      name="tab"
      :items="(itemsInternal as any[])"
    ></slot>

    <!-- Slot for add visualization (e.g. upload) -->
    <slot v-if="isCurrentAdd" name="add"></slot>

    <slot name="dialog" :items="(dialogItems as any[])"></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProvideActions } from './actions/useActions';
import {
  useProvideNavigation,
  useInjectNavigation,
} from './actions/useNavigation';
import { useProvideEditMode } from './actions/useEditMode';
import { FilterLanguage } from '../../../../datasets/language';

import { MultipleFilesLanguages } from './tab/types';

const emit = defineEmits(['update']);

const props = defineProps<{
  items?: unknown[] | null;
  editable?: boolean;
}>();

// Provide navigation to this component and the component's descendants
const {
  isCurrentAdd,
  isCurrentTab,
  isCurrentTable,
  navigateToTab,
  navigateToTable,
  setActiveTab,
} = useProvideNavigation();

const injectNavigation = useInjectNavigation();

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

const isCurrentDialog = computed(() => injectNavigation.isCurrentDialog);

// Use internal copy of items for quicker operations (e.g. sorting)
// The internal copy is also updated in case the items prop updates
const itemsInternal = computed(() => (props.items != null ? props.items : []));

const dialogItems = computed(() => {
  const data = [];

  const supportedLanguages = Object.values(FilterLanguage);

  let index = 0;
  console.log(props.items);

  for (const item of (props.items as any[]) || []) {
    const itemData = [];

    for (const language of supportedLanguages) {
      itemData.push({
        documentName: item.language === language ? item.documentName : '',
        language,
        available: item.language === language,
      });
    }

    const extension = item.src ? item.src.match(/\.[^.]*$/) : '';

    index++;

    data.push({
      name: `File_${index}${extension}`,
      data: itemData,
    });
  }

  return data as MultipleFilesLanguages;
});

const currentItems = computed(() => {
  return isCurrentDialog.value ? dialogItems.value : itemsInternal.value;
});

const editable = computed(() => props.editable === true);
useProvideEditMode(editable);

onAddItems((items: unknown[]) => {
  // Check items manipulation
  const newItems = [...currentItems.value, ...(items ?? [])];
  updateItems(newItems);
  setActiveTab(newItems.length - 1);
});

onDeleteItems((indexes: number[]) => {
  const indexSet = new Set(indexes);
  const remainingItems = currentItems.value.filter(
    (item, index) => !indexSet.has(index)
  );
  updateItems(remainingItems);
  if (remainingItems.length === 0) {
    navigateToTable();
  }
});

onDeleteAllItems(() => {
  updateItems([]);
  navigateToTable();
});

onDuplicateItem((index: number) => {
  const duplicatedEntry = isObject(currentItems.value[index])
    ? // If item to duplicate is an object, create a new object with the same properties
      { ...(currentItems.value[index] as object) }
    : // Otherwise return the original value
      currentItems.value[index];

  const newItems = [
    ...currentItems.value.slice(0, index + 1),
    duplicatedEntry,
    ...currentItems.value.slice(index + 1),
  ];

  updateItems(newItems);

  if (isCurrentTab.value) {
    navigateToTab(index + 1);
  }
});

onUpdateItem(({ index, item }) => {
  if (isCurrentDialog.value) {
    console.log(index, item);
    console.log({ items: currentItems.value });
  } else {
    const items = [...currentItems.value];
    items[index] = item;
    updateItems(items);
  }
});

onUpdateItems((items: unknown[]) => {
  console.log(isCurrentDialog.value);

  if (isCurrentDialog.value) {
    console.log({ items });
  } else {
    emit('update', { prop: 'items', value: items });
  }
});

const isObject = (o: unknown): o is object =>
  typeof o === 'object' && o !== null;

const formaItemsForLanguageDialog = (items: Record<string, string>[]) => {
  const data = [];

  const supportedLanguages = Object.values(FilterLanguage);

  let index = 0;

  for (const item of items) {
    const itemData = [];

    for (const language of supportedLanguages) {
      itemData.push({
        documentName: item.documentName || '',
        language,
        available: item.language === language,
      });
    }

    const extension = item.src ? item.src.match(/\.[^.]*$/) : '';

    index++;

    data.push({
      name: `File_${index}.${extension}`,
      data: JSON.parse(JSON.stringify(itemData)),
    });
  }

  return data as MultipleFilesLanguages;
};
</script>
