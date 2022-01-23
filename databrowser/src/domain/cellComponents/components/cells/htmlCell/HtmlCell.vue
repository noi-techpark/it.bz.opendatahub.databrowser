<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="html != null" v-html="html"></span>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    html?: string;
  }>(),
  {
    html: undefined,
  }
);
</script>
