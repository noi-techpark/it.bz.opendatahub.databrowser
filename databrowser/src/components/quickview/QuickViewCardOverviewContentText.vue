<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <p :class="{ 'text-dialog': true, underline }">{{ value }}</p>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    value?: string;
    underline?: boolean;
  }>(),
  {
    value: '',
    underline: false,
  }
);
</script>
