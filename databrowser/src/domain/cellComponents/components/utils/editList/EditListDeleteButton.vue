<template>
  <button type="button" class="flex gap-2" :disabled="disabled">
    <IconDelete :class="[{ 'text-delete': !disabled }]" />
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';

defineProps<{ text: string; disabled: boolean }>();
</script>
