<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <td class="p-2 md:p-4">
    <LoadingCell v-if="isLoading" />
    <slot v-else></slot>
  </td>
</template>

<script setup lang="ts">
import LoadingCell from '../../domain/cellComponents/components/cells/loadingCell/LoadingCell.vue';

defineProps<{ isLoading?: boolean }>();
</script>
