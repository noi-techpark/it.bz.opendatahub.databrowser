<template>
  <ListboxButton
    v-slot="{ open }"
    class="relative w-full border border-gray-300 pr-9 pl-3 text-left leading-tight"
  >
    <span class="block">{{ selectedOption?.label }}</span>
    <span
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
    >
      <IconStrokedArrowDown v-if="!open" class="h-5 w-5 stroke-current" />
      <IconStrokedArrowUp v-else class="h-5 w-5 stroke-current" />
    </span>
  </ListboxButton>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ListboxButton } from '@headlessui/vue';
import IconStrokedArrowDown from '../svg/IconStrokedArrowDown.vue';
import IconStrokedArrowUp from '../svg/IconStrokedArrowUp.vue';
import { SelectOption } from './types';

defineProps<{ selectedOption: SelectOption }>();
</script>
