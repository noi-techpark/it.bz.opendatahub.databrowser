<template>
  <span v-if="date != null">{{ formattedDate }}</span>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs, withDefaults } from 'vue';
import { format as formatFn } from 'date-fns';

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

const formattedDate = computed(() => {
  if (format.value == null) {
    return date;
  }
  if (date.value != null) {
    return formatFn(Date.parse(date.value), format.value);
  }
  return '';
});
</script>
