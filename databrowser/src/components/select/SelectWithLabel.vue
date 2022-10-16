<template>
  <div>
    <label :for="id" class="text-sm text-dialog">{{ label }}</label>
    <SelectCustom
      :id="id"
      :options="options"
      :size="SelectSize.md"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { randomId } from '../utils/random';
import { SelectOption, SelectSize } from './types';
import SelectCustom from './SelectCustom.vue';

defineProps<{
  label: string;
  options: SelectOption[];
  size?: SelectSize;
  showSearchWhenAtLeastCountOptions?: number;
}>();

defineEmits(['change']);

const id = randomId();
</script>
