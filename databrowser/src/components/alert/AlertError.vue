<template>
  <BaseError :title="title" :content="content" type="error" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import BaseError from './BaseError.vue';

defineProps<{
  title?: string;
  content?: string;
}>();
</script>
