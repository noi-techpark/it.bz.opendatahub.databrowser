<template>
  <router-link
    :to="to"
    :class="[
      {
        'text-green-500 bg-opacity-10 bg-green-500': active && !disabled,
        'hover:bg-gray-50': !active && !disabled,
        'border border-gray-500 bg-transparent text-gray-700 opacity-25 pointer-events-none':
          disabled,
      },
      classNames,
    ]"
    :disabled="disabled"
    class="block border font-semibold no-underline focus:outline-none"
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
  [PillVariant.edged]: 'rounded border-transparent',
};

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
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
