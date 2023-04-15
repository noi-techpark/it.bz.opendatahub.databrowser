<template>
  <th class="p-4 font-semibold uppercase text-gray-900" @click="toggleSort">
    <div
      class="flex items-center justify-between"
      :class="{ 'cursor-pointer': hasSortField }"
    >
      {{ text }}
      <IconStrokedArrowDown
        v-if="currentSortMatchesSortField"
        class="h-5 w-5 stroke-current"
        :class="{ 'rotate-180': currentSortState === 'asc' }"
      />
    </div>
  </th>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useTableSort } from './useTableSort';
import IconStrokedArrowDown from '../svg/IconStrokedArrowDown.vue';

const props = withDefaults(
  defineProps<{
    text: string;
    fields?: Record<string, string>;
  }>(),
  {
    filter: undefined,
    fields: () => ({}),
  }
);

const { text, fields } = toRefs(props);

const {
  currentSortState,
  currentSortMatchesSortField,
  hasSortField,
  toggleSort,
} = useTableSort(fields);
</script>
