<template>
  <header class="bg-gray-100">
    <ContentAlignmentX
      class="flex flex-col items-start px-4 pt-6 pb-8 m-auto xl:w-[80rem] 2xl:px-0"
    >
      <slot></slot>
    </ContentAlignmentX>
  </header>
</template>

<script setup lang="ts">
import ContentAlignmentX from '../content/ContentAlignmentX.vue';
</script>
