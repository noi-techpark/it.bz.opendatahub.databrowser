<template>
  <QuickViewCardBase
    :title="title"
    :cta-icon="ctaIcon"
    @cta-click="$emit('ctaClick')"
  >
    <div
      class="overview-content-card-ct"
      :class="{ 'no-padding': contentHasNoPadding }"
    >
      <slot name="content" />
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
            <TagCustom
              v-if="c.tag"
              :size="c.tag.size"
              :type="c.tag.type"
              :text="c.tag.text"
              :has-dot="c.tag.hasDot"
              class="mt-1"
            />
          </div>
        </template>
        <template #fullwidth-content>
          <div
            v-for="(c, contentIndex) in s.fullwidthContent"
            :key="`fwc_${contentIndex}`"
            :class="{ 'pb-4': contentIndex < s.content.length - 1 }"
          >
            <div v-if="c.operationScheduleTime">
              <div
                v-for="(scheduleTime, indexTime) in c.operationScheduleTime"
                :key="indexTime"
                class="opening-hour-card-ct"
              >
                <QuickViewDayInfo :schedule-time="scheduleTime" />
              </div>
            </div>
          </div>
        </template>
      </QuickViewCardOverviewContentContainer>
    </div>
  </QuickViewCardBase>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue';
import QuickViewCardBase from './QuickViewCardBase.vue';
import QuickViewCardOverviewContentContainer from './QuickViewCardOverviewContentContainer.vue';
import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';
import TagCustom from '../tag/TagCustom.vue';
import QuickViewDayInfo from './QuickViewDayInfo.vue';

interface Section {
  icon?: string;
  content: Array<any>;
  fullwidthContent?: Array<any>;
}

withDefaults(
  defineProps<{
    title?: string;
    sections: Array<Section>;
    contentHasNoPadding?: boolean;
    ctaIcon?: string;
  }>(),
  {
    title: '',
    contentHasNoPadding: false,
    ctaIcon: '',
  }
);

defineEmits(['ctaClick']);
</script>

<style scoped>
.overview-content-card-ct {
  @apply p-4;
}

.overview-content-card-ct.no-padding {
  @apply p-0;
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

.opening-hour-card-ct {
  @apply grid grid-cols-3 md:grid-cols-7 gap-3 mt-4;
}
</style>
