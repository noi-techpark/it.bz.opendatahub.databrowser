<template>
  <div v-if="date != null">
    <span class="block">{{ formattedDistance }}</span>
    <span class="block text-gray-600">{{ formattedDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs, withDefaults } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const props = withDefaults(
  defineProps<{
    date?: string;
    format?: string;
  }>(),
  {
    date: undefined,
    format: undefined,
  }
);

const { date, format } = toRefs(props);

const nth = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const formattedDate = computed(() => {
  if (format == null) {
    return date;
  }
  if (date != null) {
    const fullDate = new Date(Date.parse(date.value));
    const day = fullDate.getDate();
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][fullDate.getMonth()];
    const year = fullDate.getFullYear();

    return day + nth(day) + ' ' + month + ' ' + year;
  }
  return '';
});

const formattedDistance = computed(() => {
  if (date.value != null) {
    return formatDistanceToNow(Date.parse(date.value), {
      addSuffix: true,
      includeSeconds: true,
    });
  }
  return '';
});
</script>
