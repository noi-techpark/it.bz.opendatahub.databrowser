<template>
  <div class="quickview-card-ct">
    <div class="title-section">
      {{ title }}
      <IconParser
        v-if="ctaIcon"
        :name="ctaIcon"
        class="icon-ct"
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

<style scoped>
.quickview-card-ct {
  @apply rounded border;
}

.title-section {
  @apply font-semibold text-dialog bg-gray-50 py-2 px-4
  flex justify-between items-center;
}

.icon-ct {
  @apply w-4 h-4 cursor-pointer text-green-400;
}
</style>
