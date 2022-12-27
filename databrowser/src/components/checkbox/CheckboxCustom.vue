<template>
  <div class="flex">
    <label class="inline-flex items-center">
      <input
        v-model="checked"
        type="checkbox"
        class="h-5 w-5 rounded border-gray-400 text-green-700"
      />
      <span v-if="label != null" class="ml-3 font-semibold">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
