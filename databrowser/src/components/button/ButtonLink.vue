<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Size, Tone, Variant } from './types';
import { computed, PropType } from 'vue';
import { sizeClass, variantClass } from './styles';
import { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      required: true,
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
