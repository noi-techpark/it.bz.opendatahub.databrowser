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
import { defineProps, withDefaults, toRefs, computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    items?: Record<string, unknown>[];
    separator?: string;
    max?: string;
    fieldName?: string;
  }>(),
  {
    items: () => [],
    separator: undefined,
    max: undefined,
    fieldName: undefined,
  }
);

const { items, max, fieldName } = toRefs(props);

const itemsInternal = computed(() => items.value ?? []);

const more = ref(false);

const newItems = computed(() => {
  if (fieldName.value == null || max.value == null) {
    return [];
  }
  const itemIndex = fieldName.value;
  return [
    ...itemsInternal.value
      .map((item) => item[itemIndex])
      .slice(0, parseInt(max.value, 10)),
  ];
});
const newItemsAll = computed(() => {
  if (fieldName.value == null) {
    return [];
  }
  const itemIndex = fieldName.value;
  return [...itemsInternal.value.map((item) => item[itemIndex])];
});
</script>
