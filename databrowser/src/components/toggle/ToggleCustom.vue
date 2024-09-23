<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Switch
    v-model="turnedOn"
    class="relative inline-flex h-5 w-10 items-center rounded-full border bg-white"
    :class="switchColorClass"
    :disabled="disabled"
  >
    <span
      :class="[turnedOn ? 'translate-x-5' : 'translate-x-1', spanColorClass]"
      class="size-3 inline-block rounded-full transition duration-200 ease-in-out"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Switch } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    activeBorderClass?: string;
    activeBgClass?: string;
    inactiveBorderClass?: string;
    inactiveBgClass?: string;
  }>(),
  {
    modelValue: true,
    disabled: false,
    activeBorderClass: 'border-green-400',
    activeBgClass: 'bg-green-400',
    inactiveBorderClass: 'border-red-400',
    inactiveBgClass: 'bg-red-400',
  }
);

const turnedOn = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const switchColorClass = computed(() => {
  if (props.disabled === true) {
    return 'border-gray-400';
  }

  return turnedOn.value === true
    ? props.activeBorderClass
    : props.inactiveBorderClass;
});

const spanColorClass = computed(() => {
  if (props.disabled === true) {
    return 'bg-gray-400';
  }

  return turnedOn.value === true ? props.activeBgClass : props.inactiveBgClass;
});
</script>
