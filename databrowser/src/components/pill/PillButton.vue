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
    class="py-1 px-5 font-semibold text-center text-gray-700"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { computed, PropType } from 'vue';
import { PillVariant } from './types';

const variantStyles: Record<PillVariant, string> = {
  [PillVariant.rounded]: 'rounded-full border border-gray-400',
  [PillVariant.edged]: 'rounded-lg border border-transparent',
};

export default defineComponent({
  props: {
    variant: {
      type: String as PropType<PillVariant>,
      default: PillVariant.rounded,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classNames = computed(() => variantStyles[props.variant]);

    return { classNames };
  },
});
</script>
