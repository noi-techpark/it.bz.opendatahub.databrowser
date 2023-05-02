<template>
  <ToolBox :tab-names="['Export datasets']">
    <TabPanel tabindex="-1">
      <ExportDataset :url="url" />
    </TabPanel>
  </ToolBox>
</template>

<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
import ToolBox from './ToolBox.vue';
import ExportDataset from './ExportDataset.vue';

defineProps<{ url: string }>();
</script>
