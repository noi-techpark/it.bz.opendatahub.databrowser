<template>
  <span v-if="data != null">{{ JSON.stringify(data) }}</span>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    data?: unknown;
  }>(),
  {
    data: undefined,
  }
);
</script>
