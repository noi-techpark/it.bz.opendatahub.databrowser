<template>
  <a :href="href" :class="className"><slot></slot></a>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Size, Tone, Variant } from './types';
import { computed } from 'vue';
import { sizeClass, variantClass } from './styles';

const props = withDefaults(
  defineProps<{
    href: string;
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
