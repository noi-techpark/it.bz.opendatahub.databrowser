<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <TableCustom v-if="hasItems" class="mb-5 overflow-y-auto">
      <colgroup>
        <template v-if="hasItems">
          <col class="w-24" />
        </template>

        <!-- Slot for colgroup -->
        <slot name="colGroup"></slot>
      </colgroup>

      <TableHeader>
        <template v-if="hasItems">
          <!-- Column for checkbox selection -->
          <TableHeaderCell>
            <div class="flex">
              <CheckboxCustom
                :model-value="allItemsSelected"
                class="mr-3"
                @update:model-value="toggleAllItemsSelected($event)"
              />
              <span class="hidden md:inline">Language</span>
            </div>
          </TableHeaderCell>
        </template>

        <!-- Slot for table header -->
        <slot name="tableHeader"></slot>
      </TableHeader>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in (itemsInternal as any)" :key="index">
          <template v-if="hasItems">
            <TableCell class="relative">
              <CheckboxCustom
                :model-value="itemsSelected[index]"
                :label="labelKey ? item[labelKey] : undefined"
                @change="toggleSingleItemSelection(index)"
              />
            </TableCell>
          </template>

          <!-- Slot for table cols -->
          <slot name="tableCols" :item="item" :index="index"></slot>
        </tr>
      </tbody>
    </TableCustom>
    <div v-if="!hasItems" class="mb-5">
      <slot name="noItems"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TableHeaderCell from '../../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../../components/table/TableCell.vue';
import CheckboxCustom from '../../../../../../components/checkbox/CheckboxCustom.vue';
import TableCustom from '../../../../../../components/table/TableCustom.vue';
import TableHeader from '../../../../../../components/table/TableHeader.vue';
import { useItemSelection } from './useItemSelection';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectActionTriggers } from '../actions/useActions';

const props = defineProps<{
  items: unknown[] | null;
  hideTabLink?: boolean;
  labelKey?: string;
}>();

// Inject navigation from an ancestor component
const { navigateToTab } = useInjectNavigation();

const itemsInternal = computed({
  get: () => (props.items != null ? props.items : []),
  set: (value) => updateItems(value),
});

const hasItems = computed(() => itemsInternal.value.length > 0);

const {
  allItemsSelected,
  anyItemSelected,
  itemsSelected,
  toggleAllItemsSelected,
  toggleSingleItemSelection,
} = useItemSelection(itemsInternal);

const { deleteItems, duplicateItem, pushItem, updateItems } =
  useInjectActionTriggers();

const deleteSelectedItems = () => {
  const indexes = itemsSelected.value.reduce<number[]>(
    (previous, currentSelected, index) =>
      currentSelected ? [...previous, index] : [...previous],
    []
  );
  deleteItems(indexes);
};

const deleteConfirmIndex = ref<number | undefined>();

const openDeleteSingleItemConfirm = (index: number) =>
  (deleteConfirmIndex.value = index);

const closeDeleteSingleItemConfirm = () =>
  (deleteConfirmIndex.value = undefined);

const deleteSingleConfirm = (index: number) => {
  closeDeleteSingleItemConfirm();
  deleteItems([index]);
};
</script>
