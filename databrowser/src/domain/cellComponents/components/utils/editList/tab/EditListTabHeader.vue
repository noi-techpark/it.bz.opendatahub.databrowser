<template>
  <div>
    <EditListHeader>
      <EditListBackButton label="Back to overview" @click="navigateToTable" />
    </EditListHeader>
    <EditListTabHeaderButtons class="flex justify-between mb-5 md:hidden" />
    <div class="flex justify-between items-center text-sm bg-gray-50">
      <div
        ref="tabWrapper"
        class="flex overflow-auto flex-nowrap items-center w-full"
      >
        <TabCustom
          v-for="(item, index) in items"
          :key="index"
          :active="activeTab === index"
          class="flex-none gap-2 w-36"
          :class="[{ 'active-tab': activeTab === index }]"
          @click="navigateToTab(index)"
        >
          <slot name="tabLabel" :item="item" :index="index"></slot>
        </TabCustom>
      </div>

      <EditListTabHeaderButtons class="hidden md:flex">
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

defineProps<{
  items: unknown[];
  activeTab: number;
}>();

const { navigateToTab, navigateToTable } = useInjectNavigation();

// Scroll active tab into view in case there are many to many tabs to show
const tabWrapper = ref();
setTimeout(() =>
  tabWrapper.value.querySelector('.active-tab')?.scrollIntoView()
);
</script>
