<template>
  <span v-if="data != null">{{ JSON.stringify(data) }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      default: () => null,
      type: Object,
    },
  },
});
</script>
