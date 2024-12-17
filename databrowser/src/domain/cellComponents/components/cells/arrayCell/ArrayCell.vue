<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <span v-if="items != null && !(emptyText && !items?.length)">{{
    items?.join(separator)
  }}</span>
  <span v-else-if="emptyText">{{ emptyText }}</span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    items?: [];
    separator?: string;
    emptyText?: string;
  }>(),
  {
    items: () => [],
    separator: ' ',
    emptyText: '',
  }
);
</script>
