<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="data != null">
    <span v-if="!usePreformatted">
      {{ JSON.stringify(data) }}
    </span>
    <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    data?: unknown;
    usePreformatted?: string | boolean;
  }>(),
  {
    data: undefined,
    usePreformatted: false,
  }
);
</script>
