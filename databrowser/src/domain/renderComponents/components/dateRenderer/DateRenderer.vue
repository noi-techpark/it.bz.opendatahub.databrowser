<template>
  <span v-if="date != null">{{ date }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    date: {
      default: () => null,
      type: String,
    },
  },
});
</script>
