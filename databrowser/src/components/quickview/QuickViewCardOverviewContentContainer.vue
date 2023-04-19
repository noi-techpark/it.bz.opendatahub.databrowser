<template>
  <div>
    <div class="flex gap-3">
      <div v-if="icon" class="h-8 w-8 shrink-0 text-green-400">
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
import { defineProps, withDefaults } from 'vue';

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
