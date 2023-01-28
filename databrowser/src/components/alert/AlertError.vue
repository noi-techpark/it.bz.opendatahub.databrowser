<template>
  <BaseAlert :title="title" :content="content" type="error" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import BaseAlert from './BaseAlert.vue';

defineProps<{
  title?: string;
  content?: string;
}>();
</script>
