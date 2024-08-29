<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="pointer-events-all inset-x-0 bottom-0 top-[57px] z-10"
    :class="{
      'fixed z-50 border-t bg-dialog/60 md:static md:bg-transparent': active,
    }"
  >
    <div
      :class="{ 'bg-white': active, 'px-2 py-3': padded }"
      @click.stop="null"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean;
  padded?: boolean;
}>();
</script>
