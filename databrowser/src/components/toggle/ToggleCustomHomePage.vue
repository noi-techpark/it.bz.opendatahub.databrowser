<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <ToggleCustom v-model="turnedOn"/>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import ToggleCustom from "./ToggleCustom.vue";

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
    defineProps<{
      modelValue?: boolean;
      disabled?: boolean;
      activeBorderClass?: string;
      activeBgClass?: string;
      inactiveBorderClass?: string;
      inactiveBgClass?: string;
      filterKey?: string;
      filterSelected?: { key: string; value: string }[];
    }>(),
    {
      modelValue: true,
      disabled: false,
      filterKey: '',
      activeBorderClass: 'border-green-400',
      activeBgClass: 'bg-green-400',
      inactiveBorderClass: 'border-red-400',
      inactiveBgClass: 'bg-red-400',
      filterSelected: () => [],
    }
);

const turnedOn = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(
    () => props.filterSelected,
    (newFilterSelected) => {
      turnedOn.value = newFilterSelected.some(
          (filter) => filter.key === props.filterKey
      );
    },
    { immediate: true }
);
</script>
