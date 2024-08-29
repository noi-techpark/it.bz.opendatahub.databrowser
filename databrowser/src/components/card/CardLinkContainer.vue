<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <router-link
    :to="to"
    class="no-underline hover:bg-hint-info/10 hover:border-hint-info border-[1px] border-transparent rounded-t px-3 pt-3 lg:px-5 lg:pt-4 mb-3"
  >
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
