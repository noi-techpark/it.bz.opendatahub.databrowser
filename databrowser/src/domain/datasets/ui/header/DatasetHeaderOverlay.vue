<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="pointer-events-all inset-x-0 bottom-0 top-0"
    :class="{
      'fixed z-50 bg-dialog/60 md:static md:bg-transparent': active,
    }"
    @click="$emit('overlayClick')"
  />

  <div
    :class="{
      'bg-white max-md:absolute left-0 right-0 top-0 z-[60]': active,
      'px-2 py-3': padded,
    }"
    @click.stop="null"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean;
  padded?: boolean;
}>();

defineEmits(['overlayClick']);
</script>
