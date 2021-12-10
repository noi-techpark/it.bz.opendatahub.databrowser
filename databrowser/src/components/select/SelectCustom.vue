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

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    modelValue: {
      required: false,
      default: () => null,
      type: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: unknown) {
        this.$emit('update:modelValue', value);
      },
    },
  },
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
