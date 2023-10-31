<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TransitionChild
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0 scale-95"
    enter-to="opacity-100 scale-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100 scale-100"
    leave-to="opacity-0 scale-95"
  >
    <slot></slot>
  </TransitionChild>
</template>

<script setup lang="ts">
import { TransitionChild } from '@headlessui/vue';
</script>
