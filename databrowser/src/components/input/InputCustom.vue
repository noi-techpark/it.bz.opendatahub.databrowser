<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex items-center gap-3">
    <label v-if="hasLabel" :for="id">{{ label }}</label>
    <input
      :id="id"
      ref="inputRef"
      v-model="text"
      class="rounded border border-gray-400 p-2 text-black focus:border-green-500"
      :class="inputClasses"
      :placeholder="placeholder"
      :type="type"
    />
    <span v-if="label != null" class="ml-3 font-semibold"></span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { randomId } from '../utils/random';

const id = randomId();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string | boolean | number;
  label?: string;
  placeholder?: string;
  inputClasses?: string;
  focus?: boolean;
  type?: 'text' | 'date' | 'datetime-local' | 'time';
}>();

const inputRef = ref();
onMounted(() => {
  if (props.focus === true) {
    setTimeout(() => inputRef.value.focus(), 50);
  }
});

const hasLabel = computed(() => props.label != null && props.label.length > 0);

const text = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped>
.has-error input {
  @apply border-error text-error;
}
</style>
