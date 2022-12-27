<template>
  <label class="cursor-pointer"
    ><input
      v-model="internalValue"
      type="radio"
      class="mr-4 inline-block text-green-500 checked:bg-none focus:ring-green-500"
      :value="value"
    />{{ label }}</label
  >
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps<{
  value: string;
  modelValue: string;
  label?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>
