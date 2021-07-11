<template>
  <button
    type="button"
    class="
      flex
      items-center
      justify-center
      p-2
      text-gray-400
      transition-colors
      bg-gray-100
      rounded-full
      focus:outline-none focus:ring
      hover:bg-gray-200 hover:text-gray-500
    "
    @click="$emit('click', $event)"
  >
    <span class="sr-only">{{ label }}</span>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
