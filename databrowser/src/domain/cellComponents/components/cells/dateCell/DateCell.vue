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

console.log(date.value);

const formattedDate = computed(() => {
  if (format == null) {
    return date;
  }
  if (date != null) {
    return formatFn(Date.parse(date.value), format.value);
  }
  return '';
});
</script>
