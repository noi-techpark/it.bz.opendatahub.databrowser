<template>
  <component :is="tagName" v-bind="attributes" .data="attributes"></component>
</template>

<script setup lang="ts">
import { defineProps, toRefs, watch, withDefaults } from 'vue';
import { loadWebComponent } from '../../domain/webComponents/lazyLoadedWebComponent';
import { isRegisteredWebComponent } from '../../domain/webComponents/webComponentRegistry';

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

watch(
  () => tagName.value,
  (name) => {
    if (isRegisteredWebComponent(name)) {
      loadWebComponent(name);
    }
  },
  { immediate: true }
);
</script>
