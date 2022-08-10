<template>
  <div>
    <span v-if="newItems != null">{{ newItems?.join(separator) }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, toRefs, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    items?: {}[];
    separator?: string;
    max?: string;
    fieldName?: string;
  }>(),
  {
    items: undefined,
    separator: undefined,
    max: undefined, 
    fieldName: undefined
  }
);

const {items, max, fieldName} = toRefs(props);

const newItems = computed(() => {
  return [...items.value.map((item) => item.hasOwnProperty(fieldName.value) ? item[fieldName.value] : "").slice(0,parseInt(max.value))]
})

</script>
