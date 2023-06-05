<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="border border-gray-300 ring-gray-400">
    <SelectSearchBox
      v-if="showSearch"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <SelectOptionsList
      :search-results="searchResults"
      @keydown="showSearch ? handleKeyDown($event) : true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { SelectOption } from './types';
import SelectOptionsList from './SelectOptionsList.vue';
import SelectSearchBox from './SelectSearchBox.vue';
import { useOptionsContainerEventHandler } from './useOptionsContainerEventHandler';

defineProps<{
  modelValue: string;
  showSearch: boolean;
  searchResults: SelectOption[];
}>();

defineEmits(['update:modelValue']);

// Handle options container keydown event
const { handleKeyDown } = useOptionsContainerEventHandler();
</script>
