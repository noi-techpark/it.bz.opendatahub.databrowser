<template>
  <component :is="tagName" class="grid gap-5 lg:grid-cols-2"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    tagName?: string;
  }>(),
  {
    tagName: 'div',
  }
);
</script>
