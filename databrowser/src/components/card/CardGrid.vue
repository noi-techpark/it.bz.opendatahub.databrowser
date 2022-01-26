<template>
  <component :is="tagName" class="grid lg:grid-cols-2 gap-x-5 gap-y-5"
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
