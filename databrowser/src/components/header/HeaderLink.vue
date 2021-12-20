<template>
  <a :href="to" class="text-gray-900 hover:text-gray-600">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    to: {
      required: true,
      type: String,
    },
  },
});
</script>
