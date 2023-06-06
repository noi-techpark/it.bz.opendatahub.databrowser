<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex">
    <label class="inline-flex cursor-pointer items-center">
      <input
        v-model="checked"
        type="checkbox"
        class="h-5 w-5 cursor-pointer rounded border-gray-400 text-green-700"
        :tabindex="tabbable ? undefined : -1"
      />
      <span v-if="label != null" class="ml-3 font-semibold">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    label?: string;
    tabbable?: boolean;
  }>(),
  {
    label: undefined,
    tabbable: true,
  }
);

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
