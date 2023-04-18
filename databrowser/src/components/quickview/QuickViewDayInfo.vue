<template>
  <div v-for="d in days" :key="d.day" class="opening-hour-card">
    <div
      class="day"
      :class="[
        d.open
          ? 'bg-hint-calm-secondary text-hint-calm'
          : 'bg-hint-error-secondary text-hint-error',
      ]"
    >
      {{ d.day }}
    </div>
    <div class="time">
      <template v-if="d.open">
        <span>{{ d.start ?? '&nbsp;' }}</span>
        <span class="divisor">-</span>
        <span>{{ d.end ?? '&nbsp;' }}</span>
      </template>
      <span v-else>{{ t('datasets.quickView.closed') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { OperationScheduleTimeEntry } from '../../domain/cellComponents/components/cells/operationScheduleCell/types';
import { operationScheduleTimeDays } from '../../domain/cellComponents/components/cells/operationScheduleCell/operationScheduleOptions';

const { t } = useI18n();

const props = defineProps<{ scheduleTime: OperationScheduleTimeEntry }>();

const formatTime = (time?: string) => {
  if (time == null || time === '') {
    return '-';
  }

  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

const days = computed(() =>
  operationScheduleTimeDays.map((day) => ({
    day: day.label,
    open: props.scheduleTime[day.key as keyof OperationScheduleTimeEntry],
    start: formatTime(props.scheduleTime.Start),
    end: formatTime(props.scheduleTime.End),
  }))
);
</script>

<style scoped>
.opening-hour-card {
  @apply flex flex-col border rounded;
}

.opening-hour-card .day {
  @apply font-bold text-2xl text-center p-2;
}

.opening-hour-card .time {
  @apply text-dialog text-center p-2 flex flex-col grow justify-center;
}

.opening-hour-card span {
  @apply leading-tight;
}
</style>
