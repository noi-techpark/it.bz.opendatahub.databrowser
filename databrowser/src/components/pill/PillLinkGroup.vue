<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="block">
    <PillLinkGroupItem
      v-for="(item, index) in data"
      :key="item.label"
      :is-first="index == 0"
      :is-last="index == data.length - 1"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import PillLinkGroupItem, { PillLinkGroupData } from './PillLinkGroupItem.vue';

defineProps<{
  data: PillLinkGroupData[];
}>();
</script>
