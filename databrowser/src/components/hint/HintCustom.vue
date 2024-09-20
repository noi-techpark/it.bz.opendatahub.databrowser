<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div :class="[classNames.background, classNames.text]" class="px-4 py-2">
    <div class="flex items-center justify-between gap-3">
      <div class="grow font-semibold">{{ title }}</div>
      <button data-test="close-hint" @click="emit('close')">
        <IconClose class="size-4 rounded-full border" />
      </button>
    </div>
    <div class="mr-8"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconClose from '../svg/IconClose.vue';
import { HintType } from './types';

interface Color {
  background: string;
  text: string;
}

const types: Record<string, Color> = {
  calm: {
    background: 'bg-dialog',
    text: 'text-white',
  },
  info: {
    background: 'bg-hint-info-secondary',
    text: 'text-hint-info',
  },
  warning: {
    background: 'bg-hint-warning-secondary',
    text: 'text-hint-warning',
  },
  error: {
    background: 'bg-hint-error-secondary',
    text: 'text-hint-error',
  },
};

const emit = defineEmits(['close']);

const props = defineProps<{
  type: HintType;
  title?: string;
  content?: string;
}>();

const classNames = computed(() => types[props.type]);
</script>
