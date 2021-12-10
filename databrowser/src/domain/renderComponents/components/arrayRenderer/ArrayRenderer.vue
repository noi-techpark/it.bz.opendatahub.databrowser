<template>
  <span v-if="items != null">{{ items?.join(separator) }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      default: () => [],
      type: Array,
    },
    separator: {
      default: () => ' ',
      type: String,
    },
  },
});
</script>
