<template>
  <InputCustom
    v-if="isEditMode"
    input-classes="w-full"
    :model-value="text"
    @update:model-value="update($event)"
  />
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';
import InputCustom from '../../../../../components/input/InputCustom.vue';

const emit = defineEmits(['update']);

withDefaults(
  defineProps<{
    text?: string | boolean | number;
    isEditMode?: boolean;
  }>(),
  {
    text: '',
    isEditMode: false,
  }
);

const update = (value: unknown) =>
  emit('update', {
    prop: 'text',
    value,
  });
</script>

<style scoped>
.has-error input {
  @apply border-error text-error;
}
</style>
