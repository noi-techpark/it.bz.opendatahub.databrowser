<template>
  <div v-if="title != null || subtitle != null">
    <div v-if="title != null">
      <strong>{{ title }}</strong>
    </div>
    <div v-if="subtitle != null">
      <span>{{ subtitle }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      default: () => null,
      type: String,
    },
    subtitle: {
      default: () => null,
      type: String,
    },
  },
});
</script>
