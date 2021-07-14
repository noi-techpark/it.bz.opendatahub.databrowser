<template>
  <button
    :type="type"
    class="
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      font-medium
      transition-colors
      rounded-md
      focus:outline-none focus:ring
    "
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>
