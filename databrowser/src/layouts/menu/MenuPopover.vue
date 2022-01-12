<template>
  <Popover class="relative">
    <PopoverButton class="flex space-x-4">
      <IconMenu />
      <span>Menu</span>
    </PopoverButton>
    <PopoverPanel
      class="inline-flex absolute z-10 py-8 px-2 bg-white divide-x shadow"
    >
      <DatasetMenu />
    </PopoverPanel>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import DatasetMenu from './DatasetMenu.vue';
import IconMenu from '../../components/svg/IconMenu.vue';

export default {
  components: { IconMenu, DatasetMenu, Popover, PopoverButton, PopoverPanel },
};
</script>
