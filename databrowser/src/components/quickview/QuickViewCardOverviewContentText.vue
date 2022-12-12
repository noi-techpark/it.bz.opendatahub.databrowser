<template>
  <p class="text-dialog">{{ value }}</p>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ value?: string }>();
</script>
