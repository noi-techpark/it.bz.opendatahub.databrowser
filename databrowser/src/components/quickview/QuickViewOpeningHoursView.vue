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

const operationSchedule = computed(() => {
  let foundHours = false;

  const timing = props.scheduleData ? [...props.scheduleData] : [];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
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
          Open: schedule[d],
        });
      }
      operationScheduleTime.push(daysHours);
    }
    time.OperationScheduleTime = operationScheduleTime;
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
            getValueOfLocale(currentLocale, schedule.OperationscheduleName)
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
  const [yearStart, , dayStart] = start.split('T')[0].split('-');
  const [yearEnd, , dayEnd] = end.split('T')[0].split('-');

  const dateLocale = 'en-US';
  const dateOptions = {
    month: 'long',
  };

  const monthStart = new Date(start).toLocaleDateString(
    dateLocale,
    dateOptions
  );
  const monthEnd = new Date(end).toLocaleDateString(dateLocale, dateOptions);

  return `${parseInt(dayStart)}. ${monthStart}${
    yearStart !== yearEnd ? ' ' + yearStart : ''
  } - ${parseInt(dayEnd)}. ${monthEnd} ${yearEnd}`;
};
</script>
