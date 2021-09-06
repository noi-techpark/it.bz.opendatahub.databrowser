<template>
  <div
    class="
      bg-red-100
      border border-red-400
      text-red-700
      px-4
      py-3
      rounded
      relative
    "
    role="alert"
  >
    <div class="font-bold">{{ title }}</div>
    <div class="block sm:inline">{{ content }}</div>
    <button
      class="
        absolute
        top-0
        right-0
        p-3
        rounded-md
        focus:outline-none focus:ring
      "
      @click="$emit('close')"
    >
      <span class="sr-only">Close</span>
      <IconsCloseIcon class="w-4 h-4" />
    </button>

    <!-- <span
      class="absolute top-0 bottom-0 right-0 px-4 py-3 close-icon"
      @click="$emit('close')"
    >
      <IconsCloseIcon></IconsCloseIcon>
    </span> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
  },
});
</script>

<style>
.close-icon {
  height: 24px;
  width: 24px;
}
</style>
