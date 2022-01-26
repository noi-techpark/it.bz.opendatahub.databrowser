<template>
  <img v-if="src != null" :src="src" :alt="alt" style="width: 100%" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    alt?: string;
    src?: string;
  }>(),
  {
    alt: undefined,
    src: undefined,
  }
);
</script>
