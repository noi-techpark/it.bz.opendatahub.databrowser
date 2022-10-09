<template>
  <div
    v-if="title != null || content != null"
    class="flex items-center py-2 px-4"
    :class="[backgroundClass]"
  >
    <div
      class="flex shrink-0 justify-center items-center w-20 h-14 text-white"
      :class="[iconClass]"
    >
      <slot><IconCheck v-if="type === 'info'" /><IconWarning v-else /></slot>
    </div>
    <div class="ml-8" :class="[textClass]">
      <div v-if="title != null" class="font-semibold">{{ title }}</div>
      <div v-if="content != null" class="text-sm">{{ content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
import IconWarning from '../svg/IconWarning.vue';
import IconCheck from '../svg/IconCheck.vue';
import { AlertType } from './types';

const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
    type?: AlertType;
  }>(),
  { title: undefined, content: undefined, type: 'error' }
);

const backgroundClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-green-100';
    case 'warning':
      return 'bg-yellow-200';
    case 'error':
      return 'bg-red-100';
    default:
      return 'bg-red-100';
  }
});
const iconClass = computed(() => buildClass('bg-alert', props.type));
const textClass = computed(() => buildClass('text-alert', props.type));

const buildClass = (prefix: string, type: AlertType): string =>
  `${prefix}-${type}`;
</script>
