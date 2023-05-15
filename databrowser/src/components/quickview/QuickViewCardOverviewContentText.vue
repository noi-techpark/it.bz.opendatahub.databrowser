<template>
  <p :class="{ 'text-dialog': true, underline }">{{ value }}</p>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    value?: string;
    underline?: boolean;
  }>(),
  {
    value: '',
    underline: false,
  }
);
</script>
