<template>
  <component
    :is="tagName"
    class="flex flex-col px-3 pt-3 pb-5 rounded-lg border border-gray-300 lg:px-5 lg:pt-4"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    tagName?: string;
  }>(),
  {
    tagName: 'div',
  }
);
</script>
