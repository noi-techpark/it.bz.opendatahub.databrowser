<template>
  <EditListTab :items="items">
    <template #tabLabel="{ index }">
      <div class="w-full">Room {{ index + 1 }}</div>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new room'" @click="addEmptyItem" />
    </template>

    <template #body="{ item, index }">
      <div class="flex flex-wrap gap-8 md:flex-nowrap">
        <div class="basis-full md:order-1 md:basis-1/3">
          <SubCategoryItem title="Date Start">
            <StringCell
              :text="item.startDate"
              :editable="editable"
              @input="updateItem(index, { startDate: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Start Time">
            <StringCell
              :text="item.startDate"
              :editable="editable"
              @input="updateItem(index, { startDate: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Date End">
            <StringCell
              :text="item.endDate"
              :editable="editable"
              @input="updateItem(index, { endDate: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="End Time">
            <StringCell
              :text="item.endDate"
              :editable="editable"
              @input="updateItem(index, { endDate: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Room Name">
            <StringCell
              :text="item.spaceDesc"
              :editable="editable"
              @input="updateItem(index, { spaceDesc: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Subtitle">
            <StringCell
              :text="item.subtitle"
              :editable="editable"
              @input="updateItem(index, { subtitle: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Location">
            <StringCell
              :text="item.spaceType"
              :editable="editable"
              @input="updateItem(index, { spaceType: $event.target.value })"
            />
          </SubCategoryItem>
        </div>
        <div class="basis-full md:order-3 md:basis-1/3">
          <div v-if="editable" class="rounded border">
            <div class="flex items-center justify-between bg-gray-50 py-3 px-4">
              <span class="font-semibold">Info &amp; action</span>
            </div>
            <div class="divide-y p-4">
              <div>
                <button
                  class="m-3 flex items-center gap-3"
                  @click="duplicateItem(index)"
                >
                  <IconCopy class="text-green-500" />
                  <span>Duplicate</span>
                </button>
              </div>
              <div>
                <button
                  class="mx-3 mt-3 flex items-center gap-3"
                  @click="deleteItems([index])"
                >
                  <IconDelete class="text-delete" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-full md:order-2 md:basis-1/3"></div>
      </div>
    </template>
  </EditListTab>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import StringCell from '../stringCell/StringCell.vue';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface RoomBookedEntry {
  space?: string;
  spaceDesc?: string;
  spaceAbbrev?: string;
  spaceType?: string;
  subtitle?: string;
  comment?: string;
  startDate?: string;
  endDate?: string;
  startDateUTC?: number;
  endDateUTC?: number;
  spaceDescRoomMapping?: string;
}

defineProps<{ items: RoomBookedEntry[] }>();

const { addEmptyItem, deleteItems, duplicateItem, updateItem } =
  useInjectActionTriggers();

const { editable } = useInjectEditMode();
</script>
