<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    :class="{
      'border-green-500 bg-green-500/10 text-green-500': isSelected,
      'hover:bg-gray-300': !isSelected,
      'rounded-l-full border-l': isFirst,
      'rounded-r-full border-r': isLast,
    }"
    class="overflow-hidden border-y border-gray-500 first:pl-1 last:pr-1"
  >
    <router-link
      :class="{
        'border-green-500': isSelected,
        'border-l': !isFirst,
        'border-r': !isLast,
      }"
      :to="item.to"
      class="block border-transparent"
      role="button"
      tabindex="0"
    >
      <span class="block px-2 py-1 font-semibold">{{ item.label }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export type PillLinkGroupData = {
  label: string | number;
  to: string | RouteLocationRaw;
  selected: boolean;
};

const props = withDefaults(
  defineProps<{
    item: PillLinkGroupData;
    isFirst?: boolean;
    isLast?: boolean;
  }>(),
  {
    isFirst: false,
    isLast: false,
  }
);

const isSelected = computed(() => props.item.selected);
</script>
