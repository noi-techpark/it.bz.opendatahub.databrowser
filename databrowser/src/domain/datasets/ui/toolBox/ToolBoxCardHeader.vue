<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxAlignment
    class="flex items-center justify-between font-semibold uppercase"
  >
    <slot></slot>
  </ToolBoxAlignment>
</template>

<script setup lang="ts">
import ToolBoxAlignment from './ToolBoxAlignment.vue';
</script>
