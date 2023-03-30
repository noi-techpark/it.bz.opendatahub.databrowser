<template>
  <a :href="href" :class="classNames" :target="target"><slot></slot></a>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import { Tone, Variant } from './types';
import { useClassNames } from './useClassNames';

const props = withDefaults(
  defineProps<{
    href: string;
    tone?: Tone;
    variant?: Variant;
    target?: string;
  }>(),
  {
    tone: 'primary',
    variant: 'underline',
    target: '_blank',
  }
);

const { tone, variant } = toRefs(props);

const classNames = useClassNames(tone, variant);
</script>
