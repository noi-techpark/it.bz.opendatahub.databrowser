<template>
  <component :is="tagName" v-bind="attributes" .data="attributes"></component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import TestRenderer from '../testRenderer/TestRenderer.vue';

export default defineComponent({
  components: { 'test-renderer': TestRenderer },
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
