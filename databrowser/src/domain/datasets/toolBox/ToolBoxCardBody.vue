<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxAlignment :class="{ 'bg-gray-50': withBgColor }">
    <slot></slot>
  </ToolBoxAlignment>
</template>

<script setup lang="ts">
import ToolBoxAlignment from './ToolBoxAlignment.vue';

withDefaults(
  defineProps<{
    withBgColor?: boolean;
  }>(),
  { withBgColor: false }
);
</script>
