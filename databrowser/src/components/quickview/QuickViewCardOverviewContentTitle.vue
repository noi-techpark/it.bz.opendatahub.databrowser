<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <h3 class="font-bold text-dialog">{{ value }}</h3>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    value?: string;
  }>(),
  {
    value: '',
  }
);
</script>
