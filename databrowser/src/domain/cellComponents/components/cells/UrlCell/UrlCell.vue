<template>
  <span v-if="text != null" class="break-all">
    <a :href="text" target="_blank">
      {{ text }}
    </a>
  </span>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    text?: string | undefined;
  }>(),
  {
    text: undefined,
  }
);
</script>
