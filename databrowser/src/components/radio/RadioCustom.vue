<template>
  <label class="cursor-pointer"
    ><input
      type="radio"
      class="inline-block mr-4 text-green-500 checked:bg-none focus:ring-green-500"
      :value="value"
      :checked="value === modelValue"
    />{{ label }}</label
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  value: string;
  label?: string;
  modelValue?: string;
}>();
</script>
