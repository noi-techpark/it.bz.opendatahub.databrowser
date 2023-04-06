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
import { computed, defineProps, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import QuickViewCardOverview from './QuickViewCardOverview.vue';
import { getTextValue } from './QuickViewUtils';
import {
  OperationScheduleEntry,
  OperationScheduleTimeEntry,
} from '../../domain/cellComponents/components/cells/operationScheduleCell/types';
import { operationScheduleTimeDays } from '../../domain/cellComponents/components/cells/operationScheduleCell/operationScheduleOptions';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    operationSchedules?: OperationScheduleEntry[];
  }>(),
  {
    operationSchedules: () => [],
  }
);

const formatTime = (time?: string) => {
  if (time == null || time === '') {
    return '-';
  }

  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

const operationSchedule = computed(() => {
  let foundHours = false;

  const timing = props.operationSchedules ? [...props.operationSchedules] : [];

  const parsedData = [];
  for (const time of timing) {
    const operationScheduleTime = [];

    for (const schedule of time?.operationScheduleTimes || []) {
      foundHours = true;
      const daysHours = [];
      for (const d of operationScheduleTimeDays) {
        daysHours.push({
          Start: formatTime(schedule.Start),
          End: formatTime(schedule.End),
          State: schedule.State,
          Timecode: schedule.Timecode,
          Day: d.label,
          Open: schedule[d.key as keyof OperationScheduleTimeEntry],
        });
      }
      operationScheduleTime.push(daysHours);
    }
    const result = { ...time, OperationScheduleTime: operationScheduleTime[0] };
    parsedData.push({
      ...result,
      OperationScheduleTime: operationScheduleTime,
      TimePeriodRange: getTimePeriodRange(time.start, time.stop),
    });
  }

  return foundHours ? parsedData : null;
});

const operationScheduleSections = computed(() => {
  if (!operationSchedule.value) {
    return [];
  }

  const sections = [];

  for (const schedule of operationSchedule.value) {
    sections.push({
      icon: 'IconClock',
      content: [
        {
          title: getTextValue(schedule.name),
          text: schedule.TimePeriodRange,
        },
      ],
      fullwidthContent: [
        { operationScheduleTime: schedule.OperationScheduleTime },
      ],
    });
  }

  return sections;
});

const getTimePeriodRange = (start?: string, end?: string) => {
  const startAsString =
    start == null ? 'Unknown' : formatFn(new Date(start), 'd. LLLL yyyy');
  const endAsString =
    end == null ? 'Unknown' : formatFn(new Date(end), 'd. LLLL yyyy');

  return `${startAsString} - ${endAsString}`;
};
</script>
