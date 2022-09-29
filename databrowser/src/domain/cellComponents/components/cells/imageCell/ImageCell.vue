<template>
  <img v-if="src != null" :src="src" :alt="alt" :style="{ width: width}" />
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    width?:string;
    alt?: string;
    src?: string;
  }>(),
  {
    width:'100%',
    alt: undefined,
    src: undefined,
  }
);
</script>
