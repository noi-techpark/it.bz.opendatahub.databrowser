<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Switch
    v-model="enabled"
    class="relative inline-flex h-5 w-10 items-center rounded-full border bg-white"
    :class="switchColorClass"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span
      :class="[enabled ? 'translate-x-5' : 'translate-x-1', spanColorClass]"
      class="inline-block h-3 w-3 rounded-full transition duration-200 ease-in-out"
    />
  </Switch>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Switch } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{ modelValue?: boolean; disabled?: boolean }>(),
  {
    modelValue: true,
  }
);

const enabled = computed(() => props.modelValue);

const switchColorClass = computed(() => {
  if (props.disabled === true) {
    return 'border-gray-400';
  }

  return props.modelValue === true ? 'border-green-400' : 'border-red-400';
});

const spanColorClass = computed(() => {
  if (props.disabled === true) {
    return 'bg-gray-400';
  }

  return props.modelValue === true ? 'bg-green-400' : 'bg-red-400';
});
</script>
