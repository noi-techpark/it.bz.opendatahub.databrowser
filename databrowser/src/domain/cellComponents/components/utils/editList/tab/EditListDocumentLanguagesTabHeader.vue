<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
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
          {{ item.name }}
        </TabButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TabButton from '../../../../../../components/tab/TabButton.vue';

import { useInjectNavigation } from '../actions/useNavigation';

import { MultipleFilesLanguages } from './types';

defineProps<{
  items: MultipleFilesLanguages;
  activeTab: number;
}>();

const { navigateToTab } = useInjectNavigation();

// Scroll active tab into view in case there are many to many tabs to show
const tabWrapper = ref();
setTimeout(() =>
  tabWrapper.value.querySelector('.active-tab')?.scrollIntoView()
);
</script>
