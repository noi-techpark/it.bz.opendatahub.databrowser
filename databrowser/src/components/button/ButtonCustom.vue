<template>
  <button :class="className" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Size, Tone, Variant } from './types';
import { computed } from 'vue';
import { sizeClass, variantClass } from './styles';

const disabledClass: Record<Variant, Record<Tone, String>> = {
  [Variant.solid]: {
    [Tone.primary]:
      'border border-transparent bg-green-500 text-white opacity-25',
  },
  [Variant.ghost]: {
    [Tone.primary]:
      'border border-green-500 bg-transparent text-green-500 opacity-25',
  },
  [Variant.tab]: {
    [Tone.primary]:
      'border border-green-500 bg-transparent text-green-500 opacity-25 rounded-full',
  },
};

export default defineComponent({
  props: {
    variant: {
      type: String,
      default: Variant.solid,
    },
    size: {
      type: String,
      default: Size.md,
    },
    tone: {
      type: String,
      default: Tone.primary,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const className = computed(() => {
      const variant = props.variant as Variant;
      const tone = props.tone as Tone;
      const size = props.size as Size;
      return (
        'inline-block ' +
        (props.disabled
          ? disabledClass[variant][tone]
          : variantClass[variant][tone]) +
        ' ' +
        sizeClass[size]
      );
    });

    return { className };
  },
});
</script>
