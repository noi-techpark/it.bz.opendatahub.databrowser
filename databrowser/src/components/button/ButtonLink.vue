<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Size, Tone, Variant } from './types';
import { computed } from 'vue';

const variantClass: Record<Variant, String> = {
  [Variant.solid]: '',
};

const sizeClass: Record<Size, String> = {
  [Size.md]: 'py-3 px-9 font-semibold rounded-lg',
};

const toneClass: Record<Tone, String> = {
  [Tone.primary]: 'bg-green-500 text-white',
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
      return (
        'inline-block ' +
        variantClass[props.variant] +
        ' ' +
        sizeClass[props.size] +
        ' ' +
        toneClass[props.tone]
      );
    });

    return { className };
  },
});
</script>
