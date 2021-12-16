<template>
  <img v-if="src != null" :src="src" :alt="alt" style="width: 100%" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    alt: {
      default: () => null,
      type: String,
    },
    src: {
      default: () => null,
      type: String,
    },
  },
});
</script>
