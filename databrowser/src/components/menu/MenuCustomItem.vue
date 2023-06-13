<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <MenuItem v-slot="{ active, disabled }">
    <button v-if="props.type === 'button'" :class="classes(active, disabled)">
      <slot></slot>
    </button>
    <a v-else class="no-underline" :class="classes(active, disabled)">
      <slot></slot>
    </a>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';

const props = defineProps<{
  type: 'link' | 'button';
}>();

const classes = (active?: boolean, disabled?: boolean) => [
  active ? 'bg-gray-50' : '',
  disabled ? 'text-disabled' : '',
  'group flex w-full items-center rounded px-4 py-2',
];
</script>
