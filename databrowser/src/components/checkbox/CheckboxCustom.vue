<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex" @click="disabled ? undefined : emit('click', !checked)">
    <label
      class="inline-flex cursor-pointer items-center"
      :class="{ 'opacity-50': disabled }"
    >
      <input
        v-model="checked"
        type="checkbox"
        class="size-5 cursor-pointer rounded border-gray-400 text-green-700"
        :disabled="disabled"
        :tabindex="tabbable ? undefined : -1"
      />
      <span v-if="label != null" class="ml-3 font-semibold">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['click', 'update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    label?: string;
    tabbable?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    tabbable: true,
    disabled: false,
  }
);

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
