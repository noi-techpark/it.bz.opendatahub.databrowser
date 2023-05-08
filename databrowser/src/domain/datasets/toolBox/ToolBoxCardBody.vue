<template>
  <ToolBoxAlignment :class="{ 'bg-gray-50': withBgColor }">
    <slot></slot>
  </ToolBoxAlignment>
</template>

<script setup lang="ts">
import ToolBoxAlignment from './ToolBoxAlignment.vue';

withDefaults(
  defineProps<{
    withBgColor?: boolean;
  }>(),
  { withBgColor: false }
);
</script>
