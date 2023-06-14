<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DisclosureButton v-slot="{ open }">
    <div
      class="flex items-center space-x-2 font-semibold text-green-500 hover:underline"
    >
      <ArrowUp v-if="open" class="fill-current" />
      <ArrowDown v-else class="fill-current" />
      <span class="block">
        <span v-if="open">{{ props.showLessText }}</span>
        <span v-else>{{ props.showMoreText }}</span>
      </span>
    </div>
  </DisclosureButton>
</template>

<script lang="ts" setup>
import { DisclosureButton } from '@headlessui/vue';
import ArrowUp from '../svg/ArrowUp.vue';
import ArrowDown from '../svg/ArrowDown.vue';

const props = defineProps<{
  showMoreText: string;
  showLessText: string;
}>();
</script>
