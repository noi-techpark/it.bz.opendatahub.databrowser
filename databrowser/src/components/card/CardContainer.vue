<template>
  <component
    :is="tagName"
    class="
      px-3
      lg:px-5
      pt-3
      lg:pt-4
      pb-5
      rounded-lg
      flex flex-col
      border border-gray-300
    "
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
  },
});
</script>
