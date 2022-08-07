<template>
  <div class="w-full bg-gray-300">
    <div :style="{ width: `${percentage}%` }" class="h-1 bg-green-500"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{ percentage: number }>();
</script>
