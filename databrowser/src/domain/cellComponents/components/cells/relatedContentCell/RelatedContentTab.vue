<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTab :items="items">
    <template #tabLabel="{ index }">
      <div class="w-full">Related Content {{ index + 1 }}</div>
    </template>

    <template #addItems>
      <EditListAddButton
        :text="'Add new Related Content'"
        @click="addEmptyItem"
      />
    </template>

    <template
      #body="{ item, index }: { item: RelatedContentEntry, index: number }"
    >
      <div class="flex flex-wrap gap-8 md:flex-nowrap">
        <div class="basis-full md:order-1 md:basis-1/3">
          <SubCategoryItem title="Id">
            <StringCell
              :text="item.name"
              :editable="editable"
              @input="updateItem(index, { name: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Type">
            <StringCell
              :text="item.type"
              :editable="editable"
              @input="updateItem(index, { imageUrl: $event.target.value })"
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
        <div class="basis-full md:order-2 md:basis-1/3">
          <div class="rounded border">
            <div ref="target" class="flex justify-center">
              <img
                :src="item.type"
                :alt="item.id"
                :class="{
                  'object-contain': isFullscreen,
                  'rounded-b': !isFullscreen,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </EditListTab>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import StringCell from '../stringCell/StringCell.vue';
import { useFullscreen } from '@vueuse/core';
import { RelatedContentEntry } from './types';

defineProps<{ items: RelatedContentEntry[] }>();

const { addEmptyItem, deleteItems, duplicateItem, updateItem } =
  useInjectActionTriggers();

const { editable } = useInjectEditMode();

const target = ref();
const { isFullscreen } = useFullscreen(target);
</script>
