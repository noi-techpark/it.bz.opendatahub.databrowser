<template>
  <span v-if="text != null">{{ text }}</span>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    text?: string | boolean | number;
  }>(),
  {
    text: undefined,
  }
);
</script>
