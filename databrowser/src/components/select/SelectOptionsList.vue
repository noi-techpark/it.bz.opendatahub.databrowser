<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ListboxOptions
    :unmount="false"
    role="group"
    class="max-h-60 overflow-auto bg-white text-base focus-visible:outline-none"
    :class="{
      'max-h-none overflow-y-hidden': !!$slots.groupName,
    }"
  >
    <li
      v-if="!!$slots.groupName"
      class="mx-2 border-b border-gray-250 px-2 py-1 text-dialog"
      :class="{ 'pt-3': groupIndex && groupIndex > 0 }"
    >
      <slot name="groupName" />
    </li>

    <ListboxOption
      v-for="option in searchResults"
      v-slot="{ active, selected }"
      :key="option.label"
      :value="option.value"
      as="template"
    >
      <li
        :class="[
          { 'bg-green-500/10': active || selected },
          { 'text-green-500': selected || option.isAction },
          'relative cursor-pointer select-none py-1 pl-4 pr-8',
        ]"
      >
        <span
          :class="[{ 'font-semibold': selected || option.isAction }, 'block']"
        >
          {{ option.label }}
        </span>
      </li>
    </ListboxOption>
  </ListboxOptions>
</template>

<script setup lang="ts">
import { SelectOption } from './types';
import { ListboxOptions, ListboxOption } from '@headlessui/vue';

defineProps<{ searchResults: SelectOption[]; groupIndex?: number }>();
defineEmits(['update:modelValue']);
</script>
