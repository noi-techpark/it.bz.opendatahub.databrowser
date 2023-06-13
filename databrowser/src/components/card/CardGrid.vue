<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <component :is="tagName" class="grid gap-5 lg:grid-cols-2"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tagName?: string;
  }>(),
  {
    tagName: 'div',
  }
);
</script>
