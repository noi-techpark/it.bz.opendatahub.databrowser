<template>
  <component :is="tagName" class="grid lg:grid-cols-2 gap-x-5 gap-y-5"
    ><slot></slot
  ></component>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  props: {
    tagName: {
      required: true,
      type: String,
    },
  },
});
</script>
