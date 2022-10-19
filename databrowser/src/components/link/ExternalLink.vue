<template>
  <a :href="href" :class="className"><slot></slot></a>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Tone } from './types';
import { computed } from 'vue';

const toneClass: Record<Tone, string> = {
  [Tone.primary]: 'text-green-500',
};

const props = withDefaults(
  defineProps<{
    href: string;
    tone?: string;
  }>(),
  {
    tone: '',
  }
);

const className = computed(() => {
  const tone = props.tone as Tone;
  const customClass = tone ? toneClass[tone] : '';

  return (
    'flex items-center space-x-2 font-semibold hover:underline ' + customClass
  );
});
</script>
