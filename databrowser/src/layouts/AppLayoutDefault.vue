<template>
  <div class="flex flex-col h-full">
    <AppHeader />

    <div class="overflow-auto flex-auto">
      <router-view></router-view>
    </div>

    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppHeader from '../components/header/AppHeader.vue';
import AppFooter from '../components/footer/AppFooter.vue';

export default defineComponent({
  components: { AppHeader, AppFooter },
});
</script>
