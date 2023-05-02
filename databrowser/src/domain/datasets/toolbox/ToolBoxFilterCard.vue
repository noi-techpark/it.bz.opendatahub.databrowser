<template>
  <div
    class="flex flex-col divide-y rounded border"
    :class="{ 'mt-5': marginTop, 'mb-4': marginBottom }"
  >
    <ToolBoxAlignment
      class="flex items-center justify-between font-semibold text-black"
    >
      <span>{{ label }}</span>
      <slot name="right"></slot>
    </ToolBoxAlignment>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';
import ToolBoxAlignment from './ToolBoxAlignment.vue';

withDefaults(
  defineProps<{
    label: string;
    marginTop?: boolean;
    marginBottom?: boolean;
  }>(),
  { marginTop: false, marginBottom: true }
);
defineEmits(['icon-click']);
</script>
