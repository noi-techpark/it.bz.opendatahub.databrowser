<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="fixed inset-0 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <DialogPanelTransitionChild>
        <slot></slot>
      </DialogPanelTransitionChild>
    </div>
  </div>
</template>

<script setup lang="ts">
import DialogPanelTransitionChild from './DialogPanelTransitionChild.vue';
</script>
