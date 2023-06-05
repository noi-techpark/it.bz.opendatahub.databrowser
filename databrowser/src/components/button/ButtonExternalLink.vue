<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <a :href="href" :class="className" button-link><slot></slot></a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { sizeClass, variantClass } from './styles';
import { Size, Tone, Variant } from './types';

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
