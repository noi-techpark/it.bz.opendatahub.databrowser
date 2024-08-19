<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxAlignment
    class="flex items-center justify-between font-semibold"
    :class="{ uppercase: uppercase }"
  >
    <slot></slot>
  </ToolBoxAlignment>
</template>

<script setup lang="ts">
import ToolBoxAlignment from './ToolBoxAlignment.vue';

withDefaults(defineProps<{ uppercase?: boolean }>(), { uppercase: true });
</script>
