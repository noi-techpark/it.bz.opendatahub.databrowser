<template>
  <router-link
    :to="to"
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
    class="block py-1 px-5 font-semibold text-center text-gray-700"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { computed } from 'vue';
import { PillVariant } from './types';
import { RouteLocationRaw } from 'vue-router';

const variantStyles: Record<PillVariant, string> = {
  [PillVariant.rounded]: 'rounded-full border border-gray-400',
  [PillVariant.edged]: 'rounded-lg border border-transparent',
};

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    variant?: string;
    disabled?: boolean;
    active?: boolean;
  }>(),
  {
    variant: PillVariant.rounded,
    disabled: false,
    active: false,
  }
);

const classNames = computed(() => variantStyles[props.variant as PillVariant]);
</script>
