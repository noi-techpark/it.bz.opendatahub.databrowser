<template>
  <TabPanel tabindex="-1" class="flex flex-col gap-5">
    <slot></slot>
  </TabPanel>
</template>

<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
</script>
