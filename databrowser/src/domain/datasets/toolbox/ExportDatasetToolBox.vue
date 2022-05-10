<template>
  <ToolBox :is-table-view="isTableView" :tab-names="['Export datasets']">
    <TabPanel>
      <ExportDataset :url="url" />
    </TabPanel>
  </ToolBox>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { TabPanel } from '@headlessui/vue';
import ToolBox from './ToolBox.vue';
import ExportDataset from './ExportDataset.vue';

withDefaults(
  defineProps<{
    url: string;
    isTableView?: boolean;
  }>(),
  {
    isTableView: false,
  }
);
</script>
