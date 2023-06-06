<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Menu as="div" class="relative inline-block text-left">
    <slot></slot>
  </Menu>
</template>

<script setup lang="ts">
import { Menu } from '@headlessui/vue';
</script>
