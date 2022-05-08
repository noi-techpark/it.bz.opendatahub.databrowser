<template>
  <div class="flex flex-col justify-between h-screen">
    <AppHeader />
    <div class="flex overflow-y-auto flex-col flex-1">
      <slot></slot>
    </div>
    <AppFooter v-if="showAppFooter" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

withDefaults(defineProps<{ showAppFooter?: boolean }>(), {
  showAppFooter: true,
});
</script>
