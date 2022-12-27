<template>
  <div>
    <EditListHeader>
      <EditListBackButton label="Back to overview" @click="navigateToTable" />
    </EditListHeader>
    <EditListTabHeaderButtons
      v-if="isEditMode"
      class="mb-5 flex justify-between md:hidden"
    />
    <div class="flex items-center justify-between bg-gray-50 text-sm">
      <div
        ref="tabWrapper"
        class="flex w-full flex-nowrap items-center overflow-auto"
      >
        <TabCustom
          v-for="(item, index) in items"
          :key="index"
          :active="activeTab === index"
          class="w-36 flex-none gap-2"
          :class="[{ 'active-tab': activeTab === index }]"
          @click="navigateToTab(index)"
        >
          <slot name="tabLabel" :item="item" :index="index"></slot>
        </TabCustom>
      </div>

      <EditListTabHeaderButtons v-if="isEditMode" class="hidden md:flex">
        <template #addItems>
          <slot name="addItems"></slot>
        </template>
      </EditListTabHeaderButtons>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import TabCustom from '../../../../../../components/tab/TabCustom.vue';
import EditListTabHeaderButtons from './EditListTabHeaderButtons.vue';
import EditListBackButton from '../EditListBackButton.vue';
import EditListHeader from '../EditListHeader.vue';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectEditMode } from '../actions/useEditMode';

defineProps<{
  items: unknown[];
  activeTab: number;
}>();

const { navigateToTab, navigateToTable } = useInjectNavigation();

const { isEditMode } = useInjectEditMode();

// Scroll active tab into view in case there are many to many tabs to show
const tabWrapper = ref();
setTimeout(() =>
  tabWrapper.value.querySelector('.active-tab')?.scrollIntoView()
);
</script>
