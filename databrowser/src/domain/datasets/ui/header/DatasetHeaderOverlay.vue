<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="top-[57px] bottom-0 inset-x-0 z-10 pointer-events-all"
    :class="{
      'bg-dialog/60 md:bg-transparent md:static fixed z-50 border-t': active,
    }"
  >
    <div
      :class="{ 'bg-white': active, 'py-3 px-2': padded }"
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
