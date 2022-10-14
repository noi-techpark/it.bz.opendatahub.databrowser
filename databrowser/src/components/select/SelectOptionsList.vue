<template>
  <ListboxOptions
    class="overflow-auto max-h-60 text-base bg-white focus-visible:outline-none"
  >
    <ListboxOption
      v-for="option in searchResults"
      v-slot="{ active, selected }"
      :key="option.label"
      :value="option"
      as="template"
    >
      <li
        :class="[
          active || selected ? 'bg-gray-50' : '',
          'relative cursor-pointer select-none pl-4 pr-8 py-1',
        ]"
      >
        <span
          :class="[
            selected ? 'font-semibold bg-gray-50' : '',
            'block uppercase',
          ]"
        >
          {{ option.label }}
        </span>
      </li>
    </ListboxOption>
  </ListboxOptions>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { SelectOption } from './types';
import { ListboxOptions, ListboxOption } from '@headlessui/vue';

defineProps<{ searchResults: SelectOption[] }>();
defineEmits(['update:modelValue']);
</script>
