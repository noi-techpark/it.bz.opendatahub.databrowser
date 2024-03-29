<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    v-if="title != null || hasContent"
    class="flex gap-8 px-4 py-2"
    :class="classNames.background"
  >
    <div
      class="my-1 flex h-14 w-20 shrink-0 items-center justify-center text-white"
      :class="classNames.icon"
    >
      <slot name="icon">
        <IconCheck v-if="type === 'info'" /><IconWarning v-else />
      </slot>
    </div>
    <div :class="classNames.text" class="min-w-0 break-words">
      <div v-if="title != null" class="font-semibold">{{ title }}</div>
      <div v-if="hasContent" class="text-sm">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import IconWarning from '../svg/IconWarning.vue';
import IconCheck from '../svg/IconCheck.vue';
import { AlertType } from './types';

interface Color {
  background: string;
  text: string;
  icon: string;
}

const types: Record<string, Color> = {
  calm: {
    background: 'bg-hint-calm-secondary',
    text: 'text-hint-calm',
    icon: 'bg-hint-calm',
  },
  info: {
    background: 'bg-hint-info-secondary',
    text: 'text-hint-info',
    icon: 'bg-hint-info',
  },
  warning: {
    background: 'bg-hint-warning-secondary',
    text: 'text-hint-warning',
    icon: 'bg-hint-warning',
  },
  error: {
    background: 'bg-hint-error-secondary',
    text: 'text-hint-error',
    icon: 'bg-hint-error',
  },
};

const props = defineProps<{ type: AlertType; title?: string }>();

const hasContent = computed(() => useSlots().default != null);

const classNames = computed(() => types[props.type]);
</script>
