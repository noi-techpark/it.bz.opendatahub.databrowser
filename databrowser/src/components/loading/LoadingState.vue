<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="isLoading || isError">
    <LoadingIndicator v-if="isLoading" />
    <LoadingError v-if="isError" :error="error" />
  </div>
</template>

<script setup lang="ts">
import LoadingError from './LoadingError.vue';
import LoadingIndicator from './LoadingIndicator.vue';

defineProps<{
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}>();
</script>
