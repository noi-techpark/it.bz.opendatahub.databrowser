<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <div class="flex gap-3">
      <div v-if="icon" class="h-6 w-6 shrink-0 text-green-400">
        <IconParser :name="icon" />
      </div>
      <div>
        <slot name="content" />
      </div>
    </div>
    <slot name="fullwidth-content" />
  </div>
</template>

<script setup lang="ts">
import IconParser from '../utils/IconParser.vue';

withDefaults(
  defineProps<{
    icon?: string;
  }>(),
  {
    icon: undefined,
  }
);
</script>
