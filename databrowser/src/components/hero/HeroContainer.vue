<template>
  <header class="bg-gray-100">
    <ContentAlignmentX class="flex flex-col items-start pt-6 pb-8 lg:pb-10">
      <slot></slot>
    </ContentAlignmentX>
  </header>
</template>

<script setup lang="ts">
import ContentAlignmentX from '../content/ContentAlignmentX.vue';
</script>
