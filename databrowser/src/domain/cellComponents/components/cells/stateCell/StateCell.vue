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
  @apply py-1 px-5;
  background-color: rgba(61, 149, 252, 0.1);
  display: list-item;
  list-style-position: inside;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 4px;
  padding: none;
  float: left;
  clear: left;
  border-radius: 6px;
  color: #2264e5;
  letter-spacing: 0.5px;
}

.not-active {
  @apply py-1 px-5;
  background-color: rgba(255, 25, 87, 0.1);
  display: list-item;
  list-style-position: inside;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  padding-bottom: 4px;
  padding: none;
  float: left;
  clear: left;
  border-radius: 6px;
  color: #d12953;
  letter-spacing: 0.5px;
}
</style>
