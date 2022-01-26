<template>
  <div
    class="
      inline-flex
      flex-shrink-0
      w-12
      h-12
      text-green-400
      hover:bg-gray-100
      rounded-xl
      border border-gray-300
    "
  >
    <a
      :download="download"
      :href="url"
      class="
        inline-flex
        flex-shrink-0
        justify-center
        items-center
        w-full
        h-full
      "
    >
      <slot></slot>
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  download: string;
  url: string;
}>();
</script>
