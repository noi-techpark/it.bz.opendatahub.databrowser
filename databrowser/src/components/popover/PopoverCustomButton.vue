<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverButton v-slot="{ open, close }">
    <slot :open="open" :close="close"></slot>
  </PopoverButton>
</template>

<script setup lang="ts">
import { PopoverButton } from '@headlessui/vue';
</script>
