<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DisclosurePanel>
    <div class="py-4 text-base leading-normal text-gray-600">
      <slot />
    </div>
  </DisclosurePanel>
</template>

<script lang="ts" setup>
import { DisclosurePanel } from '@headlessui/vue';
</script>
