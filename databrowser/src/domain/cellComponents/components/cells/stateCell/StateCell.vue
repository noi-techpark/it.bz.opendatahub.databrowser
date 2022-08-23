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

<style>
.active {
  @apply py-1 px-5  border;
  background-color: rgba(61, 149, 252, 0.1);
  display: list-item;
  list-style-position: inside;
  margin-right: 1.2rem;
  padding-left: 0.8rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 6px;
  color: #2264e5;
}
.not-active {
  @apply py-1 px-5 rounded-full border;
  background-color: rgba(255, 25, 87, 0.1);
  display: list-item;
  list-style-position: inside;
  margin-right: 1rem;
  padding-left: 0.8rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 6px;
  color: #d12953;
}
</style>
