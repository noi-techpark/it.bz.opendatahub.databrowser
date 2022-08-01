<template>
  <input
    v-if="text != null"
    :value="text"
    class="p-2 w-full text-black rounded border border-gray-400"
    @input="update($event)"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';

const emit = defineEmits(['update']);

withDefaults(
  defineProps<{
    text?: string | boolean | number;
  }>(),
  {
    text: undefined,
  }
);

const update = (event: Event) =>
  emit('update', {
    prop: 'text',
    value: (event.target as HTMLInputElement).value,
  });
</script>
