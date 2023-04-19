<template>
  <div class="relative">
    <img
      v-if="mediaItems[currentMediaIndex].type === MediaItemType.IMAGE"
      :src="mediaItems[currentMediaIndex].url"
      class="w-full select-none"
    />
    <video
      v-else
      :src="mediaItems[currentMediaIndex].url"
      autoplay
      muted
      playsinline
      loop
      class="w-full select-none"
    />
    <div
      v-if="currentMediaIndex > 0"
      class="absolute left-2 right-auto top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white"
      @click="currentMediaIndex--"
    >
      <ChevronRight class="h-3 -scale-x-100" />
    </div>
    <div
      v-if="currentMediaIndex !== mediaItems.length - 1"
      class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white"
      @click="currentMediaIndex++"
    >
      <ChevronRight class="h-3" />
    </div>
  </div>
  <div class="my-4 px-4">
    <div class="last:mt-4">
      <QuickViewCardOverviewContentTitle value="Name" />
      <QuickViewCardOverviewContentText
        :value="mediaItems[currentMediaIndex].name"
      />
    </div>
    <div class="last:mt-4">
      <QuickViewCardOverviewContentTitle value="Link" />
      <QuickViewCardOverviewContentText
        :value="mediaItems[currentMediaIndex].url"
      />
    </div>
  </div>
  <div class="mb-5 flex w-full items-center justify-center gap-1">
    <div
      v-for="(item, i) in mediaItems"
      :key="i"
      class="bg-gray-250 h-3 w-3 rounded-full"
      :class="{ 'bg-green-500': i === currentMediaIndex }"
      :style="{
        transform: `scale(-${1 - Math.abs(i - currentMediaIndex) / 10})`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from 'vue';

import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';
import ChevronRight from '../svg/ChevronRight.vue';
import { MediaItem, MediaItemType } from './QuickViewCommonTypes';

withDefaults(
  defineProps<{
    mediaItems: Array<MediaItem>;
  }>(),
  {
    mediaItems: () => [],
  }
);

const currentMediaIndex = ref(0);
</script>
