<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
import { toRefs, watch } from 'vue';
import {
  BaseListFields,
  ObjectMappings,
} from '../../domain/datasetConfig/types';
import { loadWebComponent } from '../../domain/webComponents/lazyLoadedWebComponent';
import { isRegisteredWebComponent } from '../../domain/webComponents/webComponentRegistry';
import { useUpdate } from './useUpdate';

const props = withDefaults(
  defineProps<{
    tagName: string;
    attributes: Record<string, unknown>;
    objectMappings?: ObjectMappings;
    listFields?: BaseListFields;
    editable?: boolean;
  }>(),
  {
    tagName: '',
    attributes: () => ({}),
    objectMappings: undefined,
    listFields: undefined,
    editable: false,
  }
);

const { tagName, attributes, objectMappings, listFields } = toRefs(props);

watch(
  () => tagName.value,
  (name) => {
    if (isRegisteredWebComponent(name)) {
      loadWebComponent(name);
    }
  },
  { immediate: true }
);

const update = useUpdate(tagName, objectMappings, listFields);
</script>
