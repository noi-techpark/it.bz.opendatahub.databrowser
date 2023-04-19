<template>
  <div v-for="d in days" :key="d.day" class="flex flex-col rounded border">
    <div
      class="p-2 text-center text-2xl font-bold"
      :class="[
        d.open
          ? 'bg-hint-calm-secondary text-hint-calm'
          : 'bg-hint-error-secondary text-hint-error',
      ]"
    >
      {{ d.day }}
    </div>
    <div class="text-dialog flex grow flex-col justify-center p-2 text-center">
      <template v-if="d.open">
        <span class="leading-tight">{{ d.start ?? '&nbsp;' }}</span>
        <span class="divisor leading-tight">-</span>
        <span class="leading-tight">{{ d.end ?? '&nbsp;' }}</span>
      </template>
      <span v-else class="leading-tight">{{
        t('datasets.quickView.closed')
      }}</span>
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
