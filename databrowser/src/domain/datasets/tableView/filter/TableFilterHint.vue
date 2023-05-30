<template>
  <div
    v-if="areFiltersActive"
    class="flex items-center justify-between gap-2 bg-dialog px-4 py-1.5 font-semibold text-white md:hidden"
  >
    <span class="basis-1/2">{{ t('datasets.listView.tableFilterHint') }}</span>
    <ResetAllFilters class="bg-white" @reset-all-filters="removeAllFilters" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useTableFilter } from './useTableFilter';
import ResetAllFilters from './ResetAllFilters.vue';

const { t } = useI18n();

const { areFiltersActive, removeAllFilters } = useTableFilter();
</script>
