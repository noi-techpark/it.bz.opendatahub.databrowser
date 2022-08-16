<template>
  <button
    type="button"
    class="flex gap-2"
    :disabled="disabled"
    @click="emit('deleteImages')"
  >
    <IconDelete :class="[{ 'text-delete': !disabled }]" />
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';

const emit = defineEmits(['deleteImages']);

defineProps<{ text: string; disabled: boolean }>();
</script>
