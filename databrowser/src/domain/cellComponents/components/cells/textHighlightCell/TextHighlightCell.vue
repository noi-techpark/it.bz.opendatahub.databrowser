<template>
  <div v-if="title != null || subtitle != null">
    <div v-if="title != null">
      <strong>{{ title }}</strong>
    </div>
    <div v-if="subtitle != null">
      <span>{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
  }
);
</script>
