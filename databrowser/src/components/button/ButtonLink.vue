<template>
  <router-link :to="to" :class="className" button-link>
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { sizeClass, variantClass } from './styles';
import { Size, Tone, Variant } from './types';

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    variant?: string;
    size?: string;
    tone?: string;
  }>(),
  {
    variant: Variant.solid,
    size: Size.md,
    tone: Tone.primary,
  }
);

const className = computed(() => {
  const variant = props.variant as Variant;
  const tone = props.tone as Tone;
  const size = props.size as Size;
  return (
    'inline-flex items-center no-underline ' +
    variantClass[variant][tone] +
    ' ' +
    sizeClass[size]
  );
});
</script>
