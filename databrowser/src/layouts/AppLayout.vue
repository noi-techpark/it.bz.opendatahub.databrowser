<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex h-screen flex-col justify-between">
    <AppHeader />
    <div class="flex flex-1 flex-col overflow-y-auto">
      <slot></slot>
      <AppFooter v-if="showAppFooter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

withDefaults(defineProps<{ showAppFooter?: boolean }>(), {
  showAppFooter: true,
});
</script>
