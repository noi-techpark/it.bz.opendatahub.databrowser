<template>
  <span v-if="items != null">{{ items?.join(separator) }}</span>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    items?: [];
    separator?: string;
  }>(),
  {
    items: () => [],
    separator: ' ',
  }
);
</script>
