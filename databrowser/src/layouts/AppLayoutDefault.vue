<template>
  <div class="flex flex-col h-full">
    <AppHeader />

    <main class="overflow-auto flex-auto h-full">
      <router-view></router-view>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppHeader from './header/AppHeader.vue';
import AppFooter from './footer/AppFooter.vue';

export default defineComponent({
  components: { AppHeader, AppFooter },
});
</script>
