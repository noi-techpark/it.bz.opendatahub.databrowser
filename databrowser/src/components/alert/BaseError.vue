<template>
  <div
    v-if="title != null || content != null"
    class="flex items-center py-2 px-4"
    :class="classNames.background"
  >
    <div
      class="flex shrink-0 justify-center items-center w-20 h-14 text-white"
      :class="classNames.icon"
    >
      <slot><IconCheck v-if="type === 'info'" /><IconWarning v-else /></slot>
    </div>
    <div class="ml-8" :class="classNames.text">
      <div v-if="title != null" class="font-semibold">{{ title }}</div>
      <div v-if="content != null" class="text-sm">{{ content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
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

const props = defineProps<{
  type: AlertType;
  title?: string;
  content?: string;
}>();

const classNames = computed(() => types[props.type]);
</script>
