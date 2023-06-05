<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <button type="button" class="flex items-center gap-2" :disabled="disabled">
    <IconDelete :class="[{ 'text-delete': !disabled }]" />
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';

defineProps<{ text: string; disabled: boolean }>();
</script>
