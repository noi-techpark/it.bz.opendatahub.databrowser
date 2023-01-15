<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Size, Tone, Variant } from './types';
import { computed } from 'vue';
import { sizeClass, variantClass } from './styles';
import { RouteLocationRaw } from 'vue-router';

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
