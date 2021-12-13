<template>
  <div class="flex flex-col min-h-full">
    <AppNavigation />

    <main class="flex-1">
      <slot></slot>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppNavigation from './AppNavigation.vue';
import AppFooter from './AppFooter.vue';

export default defineComponent({
  components: { AppNavigation, AppFooter },
});
</script>
