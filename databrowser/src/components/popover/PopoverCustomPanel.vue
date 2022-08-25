<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <PopoverPanel v-slot="{ open, close }" class="z-20">
      <div class="bg-white rounded ring-1 ring-gray-400 shadow-md">
        <slot :open="open" :close="close"></slot>
      </div>
    </PopoverPanel>
  </transition>
</template>

<script setup lang="ts">
import { PopoverPanel } from '@headlessui/vue';
</script>
