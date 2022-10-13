<template>
  <InputCustom
    input-classes="w-full"
    :model-value="text"
    @update:model-value="update($event)"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';
import InputCustom from '../../../../../components/input/InputCustom.vue';

const emit = defineEmits(['update']);

withDefaults(
  defineProps<{
    text?: string | boolean | number;
  }>(),
  {
    text: 'undefined',
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
