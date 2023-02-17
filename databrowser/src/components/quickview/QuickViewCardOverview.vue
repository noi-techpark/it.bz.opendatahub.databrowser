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
                v-for="(time, indexTime) in c.operationScheduleTime"
                :key="indexTime"
                class="opening-hour-card-ct"
              >
                <div v-for="d in time" :key="d.Day" class="opening-hour-card">
                  <div
                    class="day"
                    :class="[
                      d.Open
                        ? 'bg-hint-calm-secondary text-hint-calm'
                        : 'bg-hint-error-secondary text-hint-error',
                    ]"
                  >
                    {{ d.Day }}
                  </div>
                  <div class="time">
                    <span> {{ d.Open ? d.Start : '&nbsp;' }}</span>
                    <span v-if="d.Open" class="divisor">-</span>
                    <span v-else>{{ t('datasets.quickView.closed') }}</span>
                    <span> {{ d.Open ? d.End : '&nbsp;' }}</span>
                  </div>
                </div>
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
import { useI18n } from 'vue-i18n';

import QuickViewCardBase from './QuickViewCardBase.vue';
import QuickViewCardOverviewContentContainer from './QuickViewCardOverviewContentContainer.vue';
import QuickViewCardOverviewContentTitle from './QuickViewCardOverviewContentTitle.vue';
import QuickViewCardOverviewContentText from './QuickViewCardOverviewContentText.vue';

import TagCustom from '../tag/TagCustom.vue';

interface Section {
  icon: string;
  content: Array<any>;
  fullwidthContent: Array<any>;
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

const { t } = useI18n();
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

.opening-hour-card {
  @apply border-2 border-gray-250 rounded;
}

.opening-hour-card .day {
  @apply font-bold text-2xl text-center p-2;
}

.opening-hour-card .time {
  @apply text-dialog text-center p-2
  flex flex-col justify-center;
}

.opening-hour-card .time.closed {
  @apply pt-5;
}

.opening-hour-card span {
  @apply leading-tight;
}
</style>
