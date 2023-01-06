<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import { useClassNames } from './useClassNames';

const props = withDefaults(
  defineProps<{
    to: string;
    tone?: string;
  }>(),
  {
    tone: '',
  }
);

const { tone } = toRefs(props);

const className = useClassNames(tone);
</script>
