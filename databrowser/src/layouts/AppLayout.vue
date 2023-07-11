<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <AppHeader @set-spacer-height="setSpacerHeight" />
    <div ref="spacer"></div>
    <slot></slot>
    <AppFooter v-if="showAppFooter" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import { ref } from 'vue';

withDefaults(defineProps<{ showAppFooter?: boolean }>(), {
  showAppFooter: true,
});

const spacer = ref<HTMLDivElement | null>(null);

function setSpacerHeight(height: number) {
  if (!spacer.value) {
    return;
  }

  spacer.value.style.height = `${height}px`;
}
</script>
