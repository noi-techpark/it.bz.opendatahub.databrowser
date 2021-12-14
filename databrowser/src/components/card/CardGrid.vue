<template>
  <component :is="tagName" class="grid lg:grid-cols-2 gap-x-5 gap-y-5"
    ><slot></slot
  ></component>
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
