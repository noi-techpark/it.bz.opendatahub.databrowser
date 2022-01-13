<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="html != null" v-html="html"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    html: {
      default: () => null,
      type: String,
    },
  },
});
</script>
