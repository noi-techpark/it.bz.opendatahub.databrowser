<template>
  <div class="border border-gray-300 ring-gray-400" :class="[roundedClass]">
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
import { computed, defineEmits, defineProps } from 'vue';
import { SelectOption } from './types';
import SelectOptionsList from './SelectOptionsList.vue';
import SelectSearchBox from './SelectSearchBox.vue';
import { useOptionsContainerEventHandler } from './useOptionsContainerEventHandler';

const props = defineProps<{
  modelValue: string;
  showSearch: boolean;
  searchResults: SelectOption[];
  isBottomPlacement: boolean;
}>();

defineEmits(['update:modelValue']);

// Handle options container keydown event
const { handleKeyDown } = useOptionsContainerEventHandler();

const roundedClass = computed(() =>
  props.isBottomPlacement ? 'rounded-b' : 'rounded-t'
);
</script>
