<template>
  <div class="flex-1">
    <table :id="id" class="data-table" :data-test="id">
      <slot></slot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { randomId } from '../utils/random';

withDefaults(defineProps<{ id?: string }>(), { id: randomId() });
</script>

<style scoped>
.data-table {
  @apply w-full border-separate table-fixed;
  border-spacing: 0;
}
.data-table :deep(th),
.data-table :deep(td) {
  @apply border;
}
.data-table :deep(tbody tr) {
  @apply align-top;
}
</style>
