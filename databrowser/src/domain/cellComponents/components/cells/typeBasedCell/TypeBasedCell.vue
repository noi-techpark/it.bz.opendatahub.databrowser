<template>
  <div v-if="data != null" class="max-h-32 overflow-auto">
    <span v-if="dataInfo.type == 'string' || dataInfo.type == 'number'">{{
      dataInfo.data
    }}</span>
    <span
      v-else-if="dataInfo.type == 'boolean'"
      :class="{ 'text-green-400': data, 'text-red-400': !data }"
      >{{ dataInfo.data }}</span
    >
    <span v-else-if="dataInfo.type == 'date'">{{ dataInfo.data }}</span>
    <pre v-else>{{ dataInfo.data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { format, isValid, parseISO } from 'date-fns';
import { computed, defineProps, withDefaults } from 'vue';
import { DEFAULT_DATE_TIME_FORMAT } from '../../../../../config/utils';

const props = withDefaults(
  defineProps<{
    data?: unknown;
  }>(),
  {
    data: undefined,
  }
);

const dataInfo = computed<{ type: string; data: any }>(() => {
  if (typeof props.data === 'string' || props.data instanceof String) {
    // Check if string is a date
    const parsedDate = parseISO(props.data as string);
    const isValidDate = isValid(parsedDate);

    return isValidDate
      ? { type: 'date', data: format(parsedDate, DEFAULT_DATE_TIME_FORMAT) }
      : { type: 'string', data: props.data };
  }
  if (typeof props.data === 'number') {
    return { type: 'number', data: props.data };
  }
  if (typeof props.data === 'boolean') {
    return { type: 'boolean', data: props.data };
  }
  if (Array.isArray(props.data)) {
    return { type: 'array', data: props.data };
  }
  return { type: 'object', data: JSON.stringify(props.data, null, 2) };
});
</script>
