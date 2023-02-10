<template>
  <div class="quick-view-card-gallery-ct">
    <div class="media-ct">
      <img
        v-if="mediaItems[currentMediaIndex].type === 'IMAGE'"
        :src="mediaItems[currentMediaIndex].url"
        class="media"
      />
      <video
        v-else
        :src="mediaItems[currentMediaIndex].url"
        autoplay
        muted
        playsinline
        loop
        class="media"
      />
      <div
        v-if="currentMediaIndex > 0"
        class="control-ct flip-icon"
        @click="currentMediaIndex--"
      >
        <ChevronRight />
      </div>
      <div
        v-if="currentMediaIndex !== mediaItems.length - 1"
        class="control-ct"
        @click="currentMediaIndex++"
      >
        <ChevronRight />
      </div>
    </div>
    <div class="descr-ct">
      <div class="detail">
        <QuickViewCardOverviewContentTitle value="Name" />
        <QuickViewCardOverviewContentText
          :value="mediaItems[currentMediaIndex].name"
        />
      </div>
      <div class="detail">
        <QuickViewCardOverviewContentTitle value="Link" />
        <QuickViewCardOverviewContentText
          :value="mediaItems[currentMediaIndex].url"
        />
      </div>
    </div>
    <div class="indicator-ct">
      <div
        v-for="(item, i) in mediaItems"
        :key="i"
        class="indicator"
        :class="{ active: i === currentMediaIndex }"
        :style="{
          transform: `scale(-${1 - Math.abs(i - currentMediaIndex) / 10})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue';

import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';
import ChevronRight from '../svg/ChevronRight.vue';

withDefaults(
  defineProps<{
    mediaItems: Array<any>;
  }>(),
  {
    mediaItems: () => [],
  }
);

let currentMediaIndex = ref(0);
</script>

<style scoped>
.quick-view-card-gallery-ct .media-ct {
  @apply relative;
}

.quick-view-card-gallery-ct .media-ct .media {
  @apply w-full select-none;
}

.quick-view-card-gallery-ct .descr-ct {
  @apply my-4 px-4;
}

.quick-view-card-gallery-ct .descr-ct .detail:last-child {
  @apply mt-4;
}

.quick-view-card-gallery-ct .indicator-ct {
  @apply w-full flex justify-center items-center gap-1 mb-5;
}

.quick-view-card-gallery-ct .indicator-ct .indicator {
  @apply bg-gray-250 w-3 h-3 rounded-full;
}

.quick-view-card-gallery-ct .indicator-ct .indicator.active {
  @apply bg-green-500;
}

.quick-view-card-gallery-ct .media-ct .control-ct {
  @apply flex items-center justify-center
  rounded-full bg-white cursor-pointer
  w-9 h-9
  absolute
  right-2;

  transform: translate(0, -50%);
  top: 50%;
}

.quick-view-card-gallery-ct .media-ct .control-ct.flip-icon {
  @apply left-2 right-auto;
}

.quick-view-card-gallery-ct .media-ct .control-ct.flip-icon svg {
  @apply -scale-x-100;
}

.quick-view-card-gallery-ct .media-ct .control-ct svg {
  @apply h-3;
}
</style>
