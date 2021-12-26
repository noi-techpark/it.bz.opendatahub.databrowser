<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div v-if="state != null">
    <span v-if="state === true" class="active">Active</span>
    <span v-else class="not-active">Not active</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    state: {
      default: () => null,
      type: Boolean,
    },
  },
});
</script>

<style>
.active {
  @apply py-1 px-5 rounded-full border;
  background-color: rgba(61, 149, 252, 0.1);
  border-color: #3d95fc;
  color: #3d95fc;
}
.not-active {
  @apply py-1 px-5 rounded-full border;
  background-color: rgba(255, 25, 87, 0.1);
  border-color: #ff1957;
  color: #ff1957;
}
</style>
