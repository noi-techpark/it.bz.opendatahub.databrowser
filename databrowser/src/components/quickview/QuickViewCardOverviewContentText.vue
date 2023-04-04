<template>
  <p class="text-dialog">{{ value }}</p>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    value?: string;
  }>(),
  {
    value: '',
  }
);
</script>
