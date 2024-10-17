<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToggleManyState v-model="model" :options="options" :disabled="disabled" />
</template>

<script setup lang="ts">
import ToggleManyState from './ToggleManyState.vue';
import { ToggleManyStateOption } from './types';

const model = defineModel<unknown>();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    // If this is true, selecting the value 'Undefined' results in a value of null.
    // If this is false, selecting the value 'Undefined' results in a value of undefined.
    undefinedIsNull?: boolean;
  }>(),
  {
    disabled: false,
    undefinedIsNull: true,
  }
);

const options: ToggleManyStateOption[] = [
  {
    label: 'Undefined',
    value: props.undefinedIsNull ? null : undefined,
  },
  {
    label: 'False',
    value: false,
  },
  {
    label: 'True',
    value: true,
  },
];
</script>
