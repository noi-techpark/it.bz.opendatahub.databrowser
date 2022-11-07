<template>
  <ListboxButton
    v-slot="{ open }"
    class="relative pr-9 pl-3 w-full leading-tight text-left border border-gray-300"
  >
    <span class="block">{{ selectedOption?.label }}</span>
    <span
      class="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none"
    >
      <IconStrokedArrowDown v-if="!open" class="w-5 h-5 stroke-current" />
      <IconStrokedArrowUp v-else class="w-5 h-5 stroke-current" />
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
