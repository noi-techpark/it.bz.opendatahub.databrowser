<template>
  <div class="rounded border">
    <div
      class="text-dialog flex items-center justify-between bg-gray-50 py-2 px-4 font-semibold"
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
import { defineProps, defineEmits, withDefaults } from 'vue';

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
