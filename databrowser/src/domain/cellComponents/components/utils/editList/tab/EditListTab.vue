<template>
  <div>
    <EditListTabHeader :items="items" :active-tab="activeTab">
      <template #tabLabel="{ item, index }">
        <slot name="tabLabel" :item="item" :index="index"></slot>
      </template>
      <template #addItems>
        <slot name="addItems"></slot>
      </template>
    </EditListTabHeader>
    <EditListTabBody
      v-if="items[activeTab] != null"
      class="mt-5"
      :item="items[activeTab]"
      :active-tab="activeTab"
    >
      <template #default="{ item, index }">
        <slot name="body" :item="item" :index="index"></slot>
      </template>
    </EditListTabBody>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue';
import { useInjectNavigation } from '../actions/useNavigation';
import EditListTabBody from './EditListTabBody.vue';
import EditListTabHeader from './EditListTabHeader.vue';

const props = defineProps<{ items: unknown[] }>();

const { activeTab, navigateToTab } = useInjectNavigation();

watch(
  () => props.items,
  (items) => {
    // Ensure that navigation.activeTab is always in bounds
    // (may not be the case e.g. when last item in list is deleted)
    if (items != null && activeTab.value >= items.length) {
      navigateToTab(items.length - 1);
    }
  }
);
</script>
