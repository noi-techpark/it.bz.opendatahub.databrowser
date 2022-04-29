<template>
  <div
    :class="{
      'text-green-500 bg-opacity-10 bg-green-500 border-green-500': isSelected,
      'hover:bg-gray-300': !isSelected,
      'rounded-l-full border-l': isFirst,
      'rounded-r-full border-r': isLast,
    }"
    class="overflow-hidden last:pr-1 first:pl-1 border-y border-gray-500"
  >
    <div
      :class="{
        'border-green-500': isSelected,
        'border-l': !isFirst,
        'border-r': !isLast,
      }"
      class="border-transparent"
      role="button"
      tabindex="0"
      @click="emits('changeSelectedItem', item)"
    >
      <span class="block py-1 px-2 font-semibold">{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    item: string;
    isFirst?: boolean;
    isLast?: boolean;
    isSelected?: boolean;
  }>(),
  {
    isFirst: false,
    isLast: false,
    isSelected: false,
  }
);

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'changeSelectedItem', item: string): void }>();
</script>
