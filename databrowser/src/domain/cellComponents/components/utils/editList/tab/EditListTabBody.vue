<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <slot :item="item" :index="activeTab"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: unknown; activeTab: number }>();
</script>
