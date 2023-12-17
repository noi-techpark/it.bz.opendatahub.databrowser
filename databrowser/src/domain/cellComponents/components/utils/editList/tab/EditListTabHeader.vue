<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <EditListHeader>
      <EditListBackButton label="Back to overview" @click="navigateToTable" />
    </EditListHeader>
    <EditListActionHeader
      v-if="editable"
      class="mb-5 flex justify-between md:hidden"
      delete-label="Delete all items"
      :any-item-selected="true"
      @confirm-delete="deleteAllItems"
    >
      <template #addItems>
        <slot name="addItems"></slot>
      </template>
    </EditListActionHeader>
    <div class="flex items-center justify-between bg-gray-50 text-sm">
      <div
        ref="tabWrapper"
        class="flex w-full flex-nowrap items-center overflow-auto"
      >
        <TabButton
          v-for="(item, index) in items"
          :key="index"
          :active="activeTab === index"
          class="w-36 flex-none gap-2"
          :class="[{ 'active-tab': activeTab === index }]"
          @click="navigateToTab(index)"
        >
          <slot name="tabLabel" :item="item" :index="index"></slot>
        </TabButton>
      </div>

      <EditListActionHeader
        v-if="editable"
        class="hidden shrink-0 items-center gap-5 px-3 md:flex"
        delete-label="Delete all items"
        :any-item-selected="true"
        @confirm-delete="deleteAllItems"
      >
        <template #addItems>
          <slot name="addItems"></slot>
        </template>
      </EditListActionHeader>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import TabButton from '../../../../../../components/tab/TabButton.vue';
import EditListActionHeader from '../header/EditListActionHeader.vue';
import EditListBackButton from '../EditListBackButton.vue';
import EditListHeader from '../header/EditListHeader.vue';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectEditMode } from '../actions/useEditMode';
import { useInjectActionTriggers } from '../actions/useActions';

defineProps<{
  items: T[];
  activeTab: number;
}>();

const { navigateToTab, navigateToTable } = useInjectNavigation();

const { editable } = useInjectEditMode();

const { deleteAllItems } = useInjectActionTriggers();

// Scroll active tab into view in case there are many to many tabs to show
const tabWrapper = ref();
setTimeout(() =>
  tabWrapper.value.querySelector('.active-tab')?.scrollIntoView()
);
</script>
