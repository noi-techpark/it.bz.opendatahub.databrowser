<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="itemsInternal.length > 0">
    <div v-if="itemsInternal.length > 3">
      <h1 v-if="more">{{ newItemsAll?.join(separator) }}</h1>
      <h1 v-else>{{ newItems?.join(separator) }}</h1>
      <button
        :class="[more ? 'text-red-500' : 'text-green-500']"
        @click="more = !more"
      >
        {{ more ? '- less' : '+ more' }}
      </button>
    </div>
    <div v-else>
      <span v-if="newItems != null">{{ newItems?.join(separator) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    items?: Record<string, unknown>[];
    separator?: string;
    max?: string;
    propertyName?: string;
  }>(),
  {
    items: () => [],
    separator: undefined,
    max: undefined,
    propertyName: undefined,
  }
);

const { items, max, propertyName } = toRefs(props);

const itemsInternal = computed(() => items.value ?? []);

const more = ref(false);

const newItems = computed(() => {
  if (propertyName.value == null || max.value == null) {
    return [];
  }
  const itemIndex = propertyName.value;
  return [
    ...itemsInternal.value
      .map((item) => item[itemIndex])
      .slice(0, parseInt(max.value, 10)),
  ];
});
const newItemsAll = computed(() => {
  if (propertyName.value == null) {
    return [];
  }
  const itemIndex = propertyName.value;
  return [...itemsInternal.value.map((item) => item[itemIndex])];
});
</script>
