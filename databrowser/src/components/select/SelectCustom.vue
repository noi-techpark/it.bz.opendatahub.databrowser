<template>
  <select
    v-model="value"
    class="
      py-1
      pr-6
      pl-4
      rounded-full
      focus:border-green-500
      appearance-none
      outline-none
      bg-white bg-no-repeat
      border border-gray-500
    "
  >
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs } from 'vue';

const props = defineProps<{
  modelValue?: unknown;
}>();

const { modelValue } = toRefs(props);

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'update:modelValue', value: unknown): void }>();

const value = computed({
  get: () => modelValue?.value,
  set: (v) => emits('update:modelValue', v),
});
</script>

<style>
select {
  @apply py-1 pr-6 pl-4 rounded-full appearance-none bg-white bg-no-repeat border border-gray-500;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath id='Polygon_47' data-name='Polygon 47' d='M5,0l5,6H0Z' transform='translate(10 6) rotate(180)' fill='%233c4043'/%3E%3C/svg%3E");
  background-size: 10px 6px;
  background-position: right 0.75rem center;
}
</style>
