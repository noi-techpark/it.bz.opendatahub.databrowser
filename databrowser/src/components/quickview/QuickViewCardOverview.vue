<template>
  <QuickViewCardBase :title="title">
    <div class="overview-content-card-ct">
      <QuickViewCardOverviewContentContainer
        v-for="(s, i) in sections"
        :key="i"
        :icon="s.icon"
        class="overview-ct"
      >
        <template #content>
          <div
            v-for="(c, contentIndex) in s.content"
            :key="`c_${contentIndex}`"
            :class="{ 'pb-4': contentIndex < s.content.length - 1 }"
          >
            <QuickViewCardOverviewContentTitle :value="c.title" />
            <QuickViewCardOverviewContentText v-if="c.text" :value="c.text" />

            <!-- TODO: tag if .tag -->
          </div>
        </template>
      </QuickViewCardOverviewContentContainer>
    </div>
  </QuickViewCardBase>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

import QuickViewCardBase from './QuickViewCardBase.vue';
import QuickViewCardOverviewContentContainer from './QuickViewCardOverviewContentContainer.vue';
import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';

defineProps<{ title?: string; sections: Array }>();
</script>

<style scoped>
.overview-content-card-ct {
  @apply p-4;
}

.overview-ct {
  @apply py-6;
}

.overview-ct:not(:last-child) {
  @apply border-b border-gray-250;
}

.overview-ct:first-child {
  @apply pt-0;
}

.overview-ct:last-child {
  @apply pb-0;
}
</style>
