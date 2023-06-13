<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseAlert :title="title" :content="content" type="info" />
</template>

<script setup lang="ts">
import BaseAlert from './BaseAlert.vue';

defineProps<{
  title?: string;
  content?: string;
}>();
</script>
