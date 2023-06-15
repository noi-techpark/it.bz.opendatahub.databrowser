<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="title != null || subtitle != null">
    <div v-if="title != null">
      <strong>{{ title }}</strong>
    </div>
    <div v-if="subtitle != null">
      <span>{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
  }
);
</script>
