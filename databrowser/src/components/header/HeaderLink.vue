<template>
  <a :href="to" class="text-gray-900 hover:text-gray-600">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from '@vue/runtime-core';

defineProps<{
  to: string;
}>();
</script>
