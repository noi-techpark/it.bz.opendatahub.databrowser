<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <MenuItems
      class="absolute right-0 mt-2 w-56 bg-white rounded divide-y divide-gray-100 focus:outline-none ring-1 ring-gray-400 shadow-md origin-top-right"
    >
      <slot></slot>
    </MenuItems>
  </transition>
</template>

<script setup lang="ts">
import { MenuItems } from '@headlessui/vue';
</script>
