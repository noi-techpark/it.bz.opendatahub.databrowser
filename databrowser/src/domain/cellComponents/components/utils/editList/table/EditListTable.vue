<template>
  <div>
    <EditListTableHeader
      :any-item-selected="anyItemSelected"
      @delete-selected-items="deleteSelectedItems"
    >
      <template #addItems>
        <slot name="addItems"></slot>
      </template>
    </EditListTableHeader>
    <TableCustom class="mb-5">
      <colgroup>
        <template v-if="hasItems">
          <col v-if="hasItems" class="w-0 md:w-10" />
          <col v-if="hasItems" class="w-10 md:w-20" />
        </template>

        <!-- Slot for colgroup -->
        <slot name="colGroup"></slot>

        <col class="w-20 md:w-28" />
      </colgroup>

      <TableHeader>
        <template v-if="hasItems">
          <!-- Column for Drag/Drop -->
          <TableHeaderCell class="w-0 bg-white border-none md:w-full">
            &nbsp;
          </TableHeaderCell>
          <!-- Column for checkbox selection -->
          <TableHeaderCell>
            <div class="flex">
              <CheckboxCustom
                :model-value="allItemsSelected"
                class="mr-3"
                @update:model-value="toggleAllItemsSelected($event)"
              />
              <span class="hidden md:inline">ALL</span>
            </div>
          </TableHeaderCell>
        </template>

        <!-- Slot for table header -->
        <slot name="tableHeader"></slot>

        <!-- Column for settings -->
        <TableHeaderCell
          v-if="hasItems"
          class="sticky right-0 font-semibold bg-gray-50"
        >
          Settings
        </TableHeaderCell>
      </TableHeader>
      <VueDraggableNext
        v-model="itemsInternal"
        tag="tbody"
        handle=".handle"
        class="divide-y divide-gray-200"
      >
        <tr v-for="(item, index) in (itemsInternal as any)" :key="index">
          <template v-if="hasItems">
            <td class="px-4 pt-4 border-none">
              <IconDragAndDrop class="hidden cursor-pointer md:block handle" />
            </td>
            <TableCell class="relative">
              <CheckboxCustom
                :model-value="itemsSelected[index]"
                @change="toggleSingleItemSelection(index)"
              />
            </TableCell>
          </template>

          <!-- Slot for table cols -->
          <slot name="tableCols" :item="item"></slot>

          <TableCell
            v-if="hasItems"
            class="sticky right-0 bg-white shadow-table-static-col"
          >
            <ItemActions
              v-if="deleteConfirmIndex !== index"
              @delete="openDeleteSingleItemConfirm(index)"
              @duplicate="duplicateItem(index)"
              @push="pushItem(index)"
              @navigate-to-tab="navigateToTab(index)"
            />
            <ConfirmDeleteSingle
              v-else
              class="inset-x-0 top-0 p-4 ml-[-16em] h-full bg-gray-50 shadow-table-static-col"
              @abort="closeDeleteSingleItemConfirm"
              @confirm="deleteSingleConfirm(index)"
            />
          </TableCell>
        </tr>
      </VueDraggableNext>
    </TableCustom>
    <div v-if="!hasItems">
      <slot name="noItems"></slot>
    </div>
    <slot name="addItems"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import TableHeaderCell from '../../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../../components/table/TableCell.vue';
import CheckboxCustom from '../../../../../../components/checkbox/CheckboxCustom.vue';
import IconDragAndDrop from '../../../../../../components/svg/IconDragAndDrop.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import TableCustom from '../../../../../../components/table/TableCustom.vue';
import TableHeader from '../../../../../../components/table/TableHeader.vue';
import { useItemSelection } from './useItemSelection';
import ConfirmDeleteSingle from './ConfirmDeleteSingle.vue';
import ItemActions from './ItemActions.vue';
import EditListTableHeader from './EditListTableHeader.vue';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectActionTriggers } from '../actions/useActions';

const props = defineProps<{ items: unknown[] }>();

// Inject navigation from an ancestor component
const { navigateToTab } = useInjectNavigation();

const itemsInternal = computed({
  get: () => props.items,
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
