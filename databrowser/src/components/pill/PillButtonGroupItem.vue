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
    <div
      :class="{
        'border-green-500': isSelected,
        'border-l': !isFirst,
        'border-r': !isLast,
      }"
      class="border-transparent"
      role="button"
      tabindex="0"
      @click="emits('changeSelectedItem', item)"
    >
      <span class="block px-2 py-1 font-semibold">{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    item: string;
    isFirst?: boolean;
    isLast?: boolean;
    isSelected?: boolean;
  }>(),
  {
    isFirst: false,
    isLast: false,
    isSelected: false,
  }
);

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'changeSelectedItem', item: string): void }>();
</script>
