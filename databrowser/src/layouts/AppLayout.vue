<template>
  <div class="flex flex-col min-h-full">
    <AppHeader />

    <main class="flex-1">
      <slot></slot>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>
