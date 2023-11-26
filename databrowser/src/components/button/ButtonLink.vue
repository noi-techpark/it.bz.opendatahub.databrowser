<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <component
    :is="renderAsSpan ? 'span' : 'router-link'"
    :to="to"
    :class="[className]"
    button-link
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { sizeClass, variantClass } from './styles';
import { Size, Tone, Variant } from './types';

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    variant?: string;
    size?: string;
    tone?: string;
    disabled?: boolean;
  }>(),
  {
    to: undefined,
    variant: Variant.solid,
    size: Size.md,
    tone: Tone.primary,
    disabled: false,
  }
);

const { to, disabled } = toRefs(props);

const renderAsSpan = computed(() => to.value == null || disabled.value);

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
