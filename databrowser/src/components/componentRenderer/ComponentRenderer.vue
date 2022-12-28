<template>
  <component
    :is="tagName"
    v-bind="attributes"
    .data="attributes"
    :editable="editable"
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
    fields?: Record<string, string>;
    listFields?: {
      pathToParent: string;
      fields: Record<string, string>;
    };
    editable?: boolean;
  }>(),
  {
    tagName: '',
    attributes: () => ({}),
    fields: undefined,
    listFields: undefined,
    editable: false,
  }
);

const { tagName, attributes, fields, listFields } = toRefs(props);

watch(
  () => tagName.value,
  (name) => {
    if (isRegisteredWebComponent(name)) {
      loadWebComponent(name);
    }
  },
  { immediate: true }
);

const update = useUpdate(tagName, fields, listFields);
</script>
