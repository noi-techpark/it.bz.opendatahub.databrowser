<template>
  <ToolBox :tab-names="['Export datasets']">
    <TabPanel>
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
