<template>
  <component :is="tagName" v-bind="attributes" .data="attributes"></component>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    tagName: string;
    attributes: Record<string, unknown>;
  }>(),
  {
    tagName: '',
    attributes: () => ({}),
  }
);

const { tagName, attributes } = toRefs(props);
</script>
