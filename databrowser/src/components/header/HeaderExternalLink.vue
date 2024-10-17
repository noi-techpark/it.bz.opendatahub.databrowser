<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <a
    :href="href"
    :class="classes"
    class="flex items-center gap-2 no-underline"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { classes } from './styles';

defineProps<{ href: string }>();
</script>
