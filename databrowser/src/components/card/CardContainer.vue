<template>
  <component
    :is="tagName"
    class="
      px-3
      lg:px-5
      pt-3
      lg:pt-4
      pb-5
      rounded-lg
      flex flex-col
      border border-gray-300
    "
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
