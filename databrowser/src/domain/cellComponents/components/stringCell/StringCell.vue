<template>
  <span v-if="text != null">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      default: () => null,
      type: [Boolean, Number, String],
    },
  },
});
</script>
