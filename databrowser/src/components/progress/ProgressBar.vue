<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="w-full bg-gray-300">
    <div :style="{ width: `${percentage}%` }" class="h-1 bg-green-500"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ percentage: number }>();
</script>
