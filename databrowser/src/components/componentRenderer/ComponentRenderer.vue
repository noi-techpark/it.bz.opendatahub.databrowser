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
  ArrayMapping,
  ObjectMapping,
} from '../../domain/datasets/config/types';
import { loadWebComponent } from '../../domain/webComponents/lazyLoadedWebComponent';
import { isRegisteredWebComponent } from '../../domain/webComponents/webComponentRegistry';
import { useUpdate } from './useUpdate';

const props = withDefaults(
  defineProps<{
    tagName: string;
    attributes: Record<string, unknown>;
    objectMapping?: ObjectMapping;
    arrayMapping?: ArrayMapping;
    editable?: boolean;
  }>(),
  {
    tagName: '',
    attributes: () => ({}),
    objectMapping: undefined,
    arrayMapping: undefined,
    editable: false,
  }
);

const { tagName, attributes, objectMapping, arrayMapping } = toRefs(props);

watch(
  () => tagName.value,
  (name) => {
    if (isRegisteredWebComponent(name)) {
      loadWebComponent(name);
    }
  },
  { immediate: true }
);

const update = useUpdate(tagName, objectMapping, arrayMapping);
</script>
