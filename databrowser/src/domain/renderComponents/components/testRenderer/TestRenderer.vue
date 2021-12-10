<template>
  <span v-if="text != null">Test Vue Render Component: {{ text }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    text: {
      required: false,
      default: null,
      type: String,
    },
  },
});
</script>
