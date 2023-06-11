<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="rounded border">
    <div
      class="flex items-center justify-between bg-gray-50 px-4 py-2 font-semibold text-dialog"
    >
      {{ title }}
      <IconParser
        v-if="ctaIcon"
        :name="ctaIcon"
        class="h-4 w-4 cursor-pointer text-green-400"
        @click="$emit('ctaClick')"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import IconParser from '../utils/IconParser.vue';

withDefaults(
  defineProps<{
    title?: string;
    ctaIcon?: string;
  }>(),
  {
    title: '',
    ctaIcon: '',
  }
);

defineEmits(['ctaClick']);
</script>
