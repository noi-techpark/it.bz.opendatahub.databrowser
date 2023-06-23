<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <QuickViewCardOverview
    :title="t('datasets.quickView.openingHours')"
    :sections="
      operationScheduleSections.length
        ? operationScheduleSections
        : [{ content: [{ text: '/' }] }]
    "
  />
</template>

<script setup lang="ts">
import { format as formatFn } from 'date-fns';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';
import { getTextValue } from './QuickViewUtils';
import { OperationScheduleEntry } from '../../domain/cellComponents/components/cells/operationScheduleCell/types';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    operationSchedules?: OperationScheduleEntry[];
  }>(),
  {
    operationSchedules: () => [],
  }
);

const timePeriodFormat = 'd. LLLL yyyy';

const getTimePeriodRange = (start?: string, end?: string) => {
  const startAsString =
    start == null ? 'Unknown' : formatFn(new Date(start), timePeriodFormat);
  const endAsString =
    end == null ? 'Unknown' : formatFn(new Date(end), timePeriodFormat);

  return `${startAsString} - ${endAsString}`;
};

const operationScheduleSections = computed(() =>
  props.operationSchedules.map((schedule) => ({
    icon: 'IconClock',
    content: [
      {
        title: getTextValue(schedule.name),
        text: getTimePeriodRange(schedule.start, schedule.stop),
      },
    ],
    fullwidthContent: [
      { operationScheduleTime: schedule.operationScheduleTimes },
    ],
  }))
);
</script>
