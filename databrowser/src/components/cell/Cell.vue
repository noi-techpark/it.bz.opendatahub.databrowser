<template>
  <component :is="tagName" .data="attributes"> </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    tagName: {
      required: true,
      type: String,
    },
    attributes: {
      required: false,
      default: () => {},
      type: Object,
    },
  },
});
</script>
