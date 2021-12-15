<template>
  <div class="flex flex-col h-full">
    <AppHeader />

    <main class="overflow-auto flex-1">
      <slot></slot>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default defineComponent({
  components: { AppHeader, AppFooter },
});
</script>
