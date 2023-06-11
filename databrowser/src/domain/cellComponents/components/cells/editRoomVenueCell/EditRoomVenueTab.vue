<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
          <SubCategoryItem title="Room Name" :required="true">
            <StringCell
              :text="item.Shortname"
              :editable="editable"
              @input="updateItem(index, { Shortname: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Indoor" :required="true">
            <ToggleCell
              :text="item.Indoor"
              :editable="editable"
              @input="updateItem(index, { Indoor: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="SquareMeters">
            <StringCell
              :text="item.SquareMeters"
              :editable="editable"
              @input="updateItem(index, { SquareMeters: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Capacity">
            <StringCell
              :text="item.Capacity"
              :editable="false"
              @input="updateItem(index, { Capacity: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="SetupType">
            <StringCell
              :text="item.SetupType"
              :editable="false"
              @input="updateItem(index, { SetupType: $event.target.value })"
            />
          </SubCategoryItem>
        </div>
        <div class="basis-full md:order-3 md:basis-1/3">
          <div v-if="editable" class="rounded border">
            <div class="flex items-center justify-between bg-gray-50 px-4 py-3">
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
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import StringCell from '../stringCell/StringCell.vue';
import { RoomVenueEntry } from './types';

defineProps<{ items: RoomVenueEntry[] }>();

const { addEmptyItem, deleteItems, duplicateItem, updateItem } =
  useInjectActionTriggers();

const { editable } = useInjectEditMode();
</script>
