<template>
  <input
    v-if="text != null"
    :value="text"
    class="p-2 w-full text-black rounded border border-gray-400"
  />
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
