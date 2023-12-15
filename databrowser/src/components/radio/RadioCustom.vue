<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <label class="flex cursor-pointer items-center gap-4">
    <input
      v-model="internalValue"
      type="radio"
      class="cursor-pointer text-green-500 checked:bg-none focus:ring-green-500"
      :value="value"
    />{{ label }}
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
