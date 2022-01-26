<template>
  <button :class="className" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
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
};

const props = withDefaults(
  defineProps<{
    variant?: string;
    size?: string;
    tone?: string;
    disabled?: boolean;
  }>(),
  {
    variant: Variant.solid,
    size: Size.md,
    tone: Tone.primary,
    disabled: false,
  }
);

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
</script>
