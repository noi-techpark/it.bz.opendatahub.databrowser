<template>
  <div
    class="flex flex-col gap-3 pb-3 md:flex-row md:items-center md:justify-between"
  >
    <component
      :is="tagName"
      class="flex justify-between text-xl font-semibold leading-tight lg:text-2xl"
    >
      <slot></slot>
    </component>
    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    tagName?: string;
  }>(),
  {
    tagName: 'h5',
  }
);
</script>
