<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <button
    :class="[
      {
        'border text-green-500 bg-opacity-10 bg-green-500 border-green-500':
          active && !disabled,
        'hover:bg-gray-200': !active && !disabled,
        'border-gray-500 bg-transparent text-gray-700 opacity-25 pointer-events-none':
          disabled,
      },
      classNames,
    ]"
    :disabled="disabled"
    class="py-1 px-5 text-center font-semibold text-gray-700"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PillVariant } from './types';

const variantStyles: Record<PillVariant, string> = {
  [PillVariant.edged]: 'rounded-lg border border-transparent',
};

const props = withDefaults(
  defineProps<{
    variant?: string;
    disabled?: boolean;
    active?: boolean;
  }>(),
  {
    variant: PillVariant.edged,
    disabled: false,
    active: false,
  }
);

const classNames = computed(() => variantStyles[props.variant as PillVariant]);
</script>
