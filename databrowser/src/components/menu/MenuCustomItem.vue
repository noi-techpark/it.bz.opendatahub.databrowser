<template>
  <MenuItem v-slot="{ active }">
    <div
      class="menu-custom-item"
      :class="[
        active ? 'bg-gray-50' : '',
        'group flex w-full items-center rounded px-4 py-2',
      ]"
    >
      <slot class="bg-red-200"></slot>
    </div>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
</script>

<style scoped>
.menu-custom-item > * {
  @apply: text-left w-full;
}
</style>
