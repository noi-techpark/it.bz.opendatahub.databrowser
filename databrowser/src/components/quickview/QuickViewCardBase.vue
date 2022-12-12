<template>
  <div class="quickview-card-ct">
    <div class="title-section">{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ title?: string }>();
</script>

<style scoped>
.quickview-card-ct {
  @apply rounded-lg border border-gray-250;
}

.title-section {
  @apply font-semibold text-dialog bg-gray-50 py-2 px-4;
}
</style>
