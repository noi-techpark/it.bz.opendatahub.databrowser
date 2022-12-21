<template>
  <div>
    <div class="content-section">
      <div v-if="icon" class="icon-ct">
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
import { defineProps } from 'vue';

import IconParser from '../utils/IconParser.vue';

defineProps({
  icon: {
    type: String,
    default: null,
  },
});
</script>

<style scoped>
.content-section {
  @apply flex gap-3;
}

.icon-ct {
  @apply h-8 w-8 flex-shrink-0;
}
</style>
