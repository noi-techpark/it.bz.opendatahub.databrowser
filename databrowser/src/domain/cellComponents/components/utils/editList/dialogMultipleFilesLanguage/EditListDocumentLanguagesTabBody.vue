<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <slot :item="item" :index="activeTab"></slot>
  </div>
</template>

<script setup lang="ts" generic="T">
defineProps<{ item: T; activeTab: number }>();
</script>
