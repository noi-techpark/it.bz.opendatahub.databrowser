<template>
  <a :href="href" :class="className"><slot></slot></a>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import { useClassNames } from './useClassNames';

const props = withDefaults(
  defineProps<{
    href: string;
    tone?: string;
  }>(),
  {
    tone: '',
  }
);

const { tone } = toRefs(props);

const className = useClassNames(tone);
</script>
