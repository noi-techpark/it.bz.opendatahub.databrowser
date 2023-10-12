<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex h-screen flex-col overflow-y-auto">
    <AppHeader
      :is-menu-open="isMenuOpen"
      class="relative z-20"
      @toggle-menu="toggleMenu"
    />
    <slot></slot>
    <AppFooter v-if="showAppFooter" />
    <div
      class="absolute z-10 w-full bg-black/60"
      :class="isMenuOpen ? 'h-full' : 'h-0'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import { ref } from 'vue';

withDefaults(defineProps<{ showAppFooter?: boolean }>(), {
  showAppFooter: true,
});

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>
