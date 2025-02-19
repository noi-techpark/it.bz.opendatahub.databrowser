<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ListboxOption v-slot="{ active, selected }" as="template">
    <li
      :class="[
        { 'bg-green-500/10': active || selected },
        { 'text-green-500': selected || isAction },
        'relative cursor-pointer select-none py-1 pl-4 pr-8',
      ]"
    >
      <span :class="[{ 'font-semibold': selected || isAction }, 'block']">
        {{ label }}
      </span>
    </li>
  </ListboxOption>
</template>

<script setup lang="ts">
import { ListboxOption } from '@headlessui/vue';

defineProps<{ label: string; isAction?: boolean }>();
</script>
