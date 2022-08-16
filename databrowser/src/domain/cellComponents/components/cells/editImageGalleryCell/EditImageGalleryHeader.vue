<template>
  <div class="mt-2 mb-4">
    <div class="mb-3">
      <slot></slot>
    </div>
    <h2 class="text-xl font-bold text-gray-900">
      {{ header }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(defineProps<{ header?: string }>(), {
  header: 'Add one or more images and provide further details',
});
</script>
