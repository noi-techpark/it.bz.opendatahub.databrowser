<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span v-if="items != null">{{ items?.join(separator) }}</span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    items?: [];
    separator?: string;
  }>(),
  {
    items: () => [],
    separator: ' ',
  }
);
</script>
