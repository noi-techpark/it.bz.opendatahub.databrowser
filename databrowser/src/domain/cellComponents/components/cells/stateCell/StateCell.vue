<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div v-if="state != null">
    <span v-if="state === true" class="active">Active</span>
    <span v-else class="not-active">Inactive</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    state?: boolean;
  }>(),
  {
    state: undefined,
  }
);
</script>

<style scoped>
span {
  @apply list-item list-inside py-1 px-2.5 rounded float-left;
}
.active {
  background-color: rgba(61, 149, 252, 0.1);
  color: #2264e5;
}
.not-active {
  background-color: rgba(255, 25, 87, 0.1);
  color: #d12953;
}
</style>
