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
import { useEditStore } from '../../domain/datasets/editView/store/editStore';
import { loadWebComponent } from '../../domain/webComponents/lazyLoadedWebComponent';
import { isRegisteredWebComponent } from '../../domain/webComponents/webComponentRegistry';

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

const editStore = useEditStore();

const update = ({ prop, value }: { prop: string; value: unknown }) => {
  const field = fields.value[prop];

  if (field == null) {
    console.error(
      `Got update event from component ${
        tagName.value
      } for field ${prop} but no field with that name could be found (known fields: ${JSON.stringify(
        fields.value
      )})`
    );
    return;
  }

  editStore.updateCurrent(field, value);
};
</script>
