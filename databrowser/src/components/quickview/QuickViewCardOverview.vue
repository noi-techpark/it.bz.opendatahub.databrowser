<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <QuickViewCardBase
    :title="title"
    :cta-icon="ctaIcon"
    @cta-click="$emit('ctaClick')"
  >
    <div :class="{ 'p-4': !contentHasNoPadding }">
      <slot name="content" />
      <QuickViewCardOverviewContentContainer
        v-for="(s, i) in sections"
        :key="i"
        :icon="s.icon"
        class="py-6 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-250"
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
                class="mt-4 grid grid-cols-3 gap-3 md:grid-cols-7"
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
