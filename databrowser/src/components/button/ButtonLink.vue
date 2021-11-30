<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Size, Tone, Variant } from './types';
import { computed } from 'vue';

const variantClass: Record<Variant, Record<Tone, String>> = {
  [Variant.solid]: {
    [Tone.primary]:
      'border border-transparent bg-green-500 text-white hover:bg-green-700 focus:bg-green-700',
  },
  [Variant.ghost]: {
    [Tone.primary]:
      'border border-green-500 bg-transparent text-green-500 hover:bg-green-500 focus:bg-green-500 hover:text-white focus:text-white',
  },
};

const sizeClass: Record<Size, String> = {
  [Size.md]: 'pt-2.5 pb-3 px-9 font-semibold rounded-lg leading-tight',
};

export default defineComponent({
  props: {
    to: {
      required: true,
      type: String,
    },
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
  },

  setup(props) {
    const className = computed(() => {
      const variant = props.variant as Variant;
      const tone = props.tone as Tone;
      const size = props.size as Size;
      return (
        'inline-block ' + variantClass[variant][tone] + ' ' + sizeClass[size]
      );
    });

    return { className };
  },
});
</script>
