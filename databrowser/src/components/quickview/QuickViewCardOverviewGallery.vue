<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <template v-if="currentMediaItem != null">
    <div class="relative">
      <img
        v-if="currentMediaItem.type === MediaItemType.IMAGE"
        :src="currentMediaItem.url"
        class="w-full select-none"
      />
      <video
        v-else
        :src="currentMediaItem.url"
        autoplay
        muted
        playsinline
        loop
        class="w-full select-none"
      />
      <div
        v-if="currentMediaIndex > 0"
        class="absolute left-2 right-auto top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-250 bg-white hover:bg-green-400/90 hover:text-white"
        @click="currentMediaIndex--"
      >
        <ChevronRight class="h-3 -scale-x-100" />
      </div>
      <div
        v-if="currentMediaIndex !== mediaItems.length - 1"
        class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-250 bg-white hover:bg-green-400/90 hover:text-white"
        @click="currentMediaIndex++"
      >
        <ChevronRight class="h-3" />
      </div>
    </div>
    <div class="my-4 px-4">
      <div class="last:mt-4">
        <QuickViewCardOverviewContentTitle
          :value="t('datasets.quickView.name')"
        />
        <QuickViewCardOverviewContentText :value="currentMediaItem.name" />
      </div>
      <div class="last:mt-4">
        <QuickViewCardOverviewContentTitle
          :value="t('datasets.quickView.link')"
        />
        <a :href="currentMediaItem.url" target="_blank">
          <QuickViewCardOverviewContentText
            :value="currentMediaItem.url"
            underline
          />
        </a>
      </div>
    </div>
    <div class="mb-5 flex w-full items-center justify-center gap-1">
      <div
        v-for="(item, i) in mediaItems"
        :key="i"
        class="h-3 w-3 rounded-full"
        :class="{
          'bg-green-500': i === currentMediaIndex,
          'bg-gray-250': i !== currentMediaIndex,
        }"
        :style="{
          transform: `scale(-${1 - Math.abs(i - currentMediaIndex) / 10})`,
        }"
      ></div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';
import ChevronRight from '../svg/ChevronRight.vue';
import { MediaItem, MediaItemType } from './QuickViewCommonTypes';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    mediaItems: MediaItem[];
  }>(),
  {
    mediaItems: () => [],
  }
);

const currentMediaIndex = ref(0);

const currentMediaItem = computed<MediaItem | undefined>(
  () => props.mediaItems[currentMediaIndex.value]
);
</script>
