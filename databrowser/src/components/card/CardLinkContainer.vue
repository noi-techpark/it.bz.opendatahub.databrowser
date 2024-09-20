<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <router-link
    :to="to"
    class="mb-3 rounded-t border border-transparent px-3 pt-3 no-underline hover:border-hint-info hover:bg-hint-info/10 lg:px-5 lg:pt-4"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

defineProps<{
  to?: RouteLocationRaw;
}>();
</script>
