<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
import ResetAllFilters from './ResetAllFilters.vue';
import { useTableFilterStore } from './tableFilterStore';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const { areFiltersActive } = storeToRefs(useTableFilterStore());

const { removeAllFilters } = useTableFilterStore();
</script>
