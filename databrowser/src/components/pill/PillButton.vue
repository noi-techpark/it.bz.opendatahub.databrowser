<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <button
    :class="[
      {
        'border border-green-500 bg-green-500/10 text-green-500':
          active && !disabled,
        'hover:bg-gray-200': !active && !disabled,
        'pointer-events-none border-gray-500 bg-transparent text-gray-700 opacity-25':
          disabled,
      },
      classNames,
    ]"
    :disabled="disabled"
    class="px-5 py-1 text-center font-semibold text-gray-700"
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
