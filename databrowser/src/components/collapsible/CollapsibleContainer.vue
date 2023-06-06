<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <Disclosure>
    <slot />
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure } from '@headlessui/vue';
</script>
