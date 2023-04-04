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

import { getValueOfLocale, getTextValue } from './QuickViewUtils';

import QuickViewCardOverview from './QuickViewCardOverview.vue';

const { t, locale } = useI18n();
const currentLocale = locale.value;

interface ScheduleTime {
  Start: string;
  End: string;
  Timecode: string;
  State: string;
}

interface ScheduleData {
  OperationScheduleTime: Array<ScheduleTime>;
  OperationscheduleName: Record<string, unknown>;
  Start: string;
  Stop: string;
}

const props = withDefaults(
  defineProps<{
    scheduleData?: Array<ScheduleData>;
  }>(),
  {
    scheduleData: () => [],
  }
);

const getTimeValue = (schedule: ScheduleTime, key: keyof ScheduleTime) => {
  return schedule[key];
};

const operationSchedule = computed(() => {
  let foundHours = false;

  const timing = props.scheduleData ? [...props.scheduleData] : [];

  const days = [
    'Monday' as keyof ScheduleTime,
    'Tuesday' as keyof ScheduleTime,
    'Wednesday' as keyof ScheduleTime,
    'Thursday' as keyof ScheduleTime,
    'Friday' as keyof ScheduleTime,
    'Saturday' as keyof ScheduleTime,
    'Sunday' as keyof ScheduleTime,
  ];

  const parsedData = [];
  for (const time of timing) {
    const operationScheduleTime = [];

    for (const schedule of time?.OperationScheduleTime || []) {
      foundHours = true;
      const daysHours = [];
      const [startHour, startMinute] = schedule.Start.split(':');
      const [endHour, endMinute] = schedule.End.split(':');
      for (const d of days) {
        daysHours.push({
          Start: `${startHour}:${startMinute}`,
          End: `${endHour}:${endMinute}`,
          State: schedule.State,
          Timecode: schedule.Timecode,
          Day: d.slice(0, 3).toUpperCase(),
          Open: getTimeValue(schedule, d),
        });
      }
      operationScheduleTime.push(daysHours);
    }
    time.OperationScheduleTime = operationScheduleTime[0];
    parsedData.push({
      ...time,
      OperationScheduleTime: operationScheduleTime,
      TimePeriodRange: getTimePeriodRange(time.Start, time.Stop),
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
          title: getTextValue(
            getValueOfLocale(
              'currentLocale',
              schedule.OperationscheduleName
            ) as string
          ),
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

const getTimePeriodRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const monthStart = formatFn(startDate, 'LLLL');
  const yearStart = formatFn(startDate, 'YYYY');
  const dayStart = formatFn(startDate, 'd');

  const endDate = new Date(end);
  const monthEnd = formatFn(startDate, 'LLLL');
  const yearEnd = formatFn(endDate, 'YYYY');
  const dayEnd = formatFn(endDate, 'd');

  return `${dayStart}. ${monthStart}${
    yearStart !== yearEnd ? ' ' + yearStart : ''
  } - ${dayEnd}. ${monthEnd} ${yearEnd}`;
};
</script>
