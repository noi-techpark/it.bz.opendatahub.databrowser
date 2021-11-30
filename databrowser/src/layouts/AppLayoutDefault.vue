<template>
  <div class="flex flex-col h-full">
    <AppNavigation />

    <main class="overflow-auto flex-auto h-full">
      <router-view></router-view>
    </main>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppNavigation from './components/AppNavigation.vue';
import AppFooter from '../components/footer/AppFooter.vue';

export default defineComponent({
  components: { AppNavigation, AppFooter },
});
</script>
