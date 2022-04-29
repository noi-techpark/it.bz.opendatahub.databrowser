<template>
  <div class="pb-2">
    <div v-if="title != null" class="text-sm text-gray-500">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title?: string;
}>();
</script>
