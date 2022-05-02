<template>
  <div
    class="p-4"
    :class="{ 'hover:bg-gray-50 cursor-pointer': props.withHover }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ withHover?: boolean }>();
</script>
