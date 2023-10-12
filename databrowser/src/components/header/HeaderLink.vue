<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <router-link :to="to" :class="classes" class="no-underline">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { classes } from './styles';

defineProps<{
  to: RouteLocationRaw;
}>();
</script>
