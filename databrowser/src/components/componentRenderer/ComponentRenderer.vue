<template>
  <component
    :is="tagName"
    v-bind="attributes"
    .data="attributes"
    @update="update"
  ></component>
</template>

<script setup lang="ts">
import { defineProps, toRefs, watch, withDefaults } from 'vue';
import { loadWebComponent } from '../../domain/webComponents/lazyLoadedWebComponent';
import { isRegisteredWebComponent } from '../../domain/webComponents/webComponentRegistry';
import { useUpdate } from './useUpdate';

const props = withDefaults(
  defineProps<{
    tagName: string;
    attributes: Record<string, unknown>;
    fields: Record<string, string>;
  }>(),
  {
    tagName: '',
    attributes: () => ({}),
    fields: () => ({}),
  }
);

const { tagName, attributes, fields } = toRefs(props);

watch(
  () => tagName.value,
  (name) => {
    if (isRegisteredWebComponent(name)) {
      loadWebComponent(name);
    }
  },
  { immediate: true }
);

const update = useUpdate(tagName, fields);
</script>
