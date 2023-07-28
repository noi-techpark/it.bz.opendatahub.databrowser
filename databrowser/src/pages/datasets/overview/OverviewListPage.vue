<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AppLayout>
    <PageGridContent class="grow gap-3 lg:gap-3">
      <div class="flex md:gap-8">
        <div class="shrink-0 md:w-64" />
        <div class="flex w-full flex-col gap-6 md:flex-row md:gap-0">
          <h1 class="grow text-2xl font-semibold text-gray-900">
            {{ tourismDatasets?.length || '...' }}
            {{
              tourismDatasets?.length === 1
                ? t('overview.listPage.datasetFound')
                : t('overview.listPage.datasetsFound')
            }}
          </h1>
          <InputCustom
            v-model="filters.searchVal"
            :placeholder="t('overview.listPage.searchDataset')"
            type="text"
            input-classes="w-full md:w-64"
          />
        </div>
      </div>

      <div class="flex w-full flex-col items-start gap-8 md:flex-row">
        <!-- Mobile filters button -->
        <div
          class="flex w-full shrink-0 items-center rounded border border-gray-300 px-3 py-2 font-semibold text-green-400 md:hidden"
          @click="showFilters"
        >
          <div class="grow">
            {{ t('overview.listPage.showFilters') }}
          </div>
          <IconFilter class="mr-2 h-3 w-3" />
        </div>

        <!-- Filters -->
        <div
          class="fixed inset-0 w-full shrink-0 rounded border border-gray-300 bg-white pb-3 md:relative md:block md:w-64"
          :class="{
            hidden: !isFiltersModalVisible,
          }"
        >
          <!-- Title -->
          <div class="sticky top-0 flex items-center gap-2">
            <h3 class="grow py-2 px-3 text-2xl font-semibold text-gray-900">
              {{ t('overview.listPage.filter') }}
            </h3>
            <div
              class="mx-3 hidden cursor-pointer select-none items-center justify-center gap-1 rounded border border-gray-300 py-1 px-2 text-sm text-green-400 md:flex"
              @click="resetFilters"
            >
              <IconDelete class="h-4 w-4 text-error" />
              {{ $t('overview.listPage.resetFilters') }}
            </div>
            <div
              class="mr-3 flex h-5 w-5 items-center justify-center border border-gray-300 text-green-400 md:hidden"
              @click="resetFilters"
            >
              <IconClose class="h-4 w-4" />
            </div>
          </div>

          <!-- Filters list -->
          <div
            class="truncate border-t border-gray-300 py-2 px-3 text-dialog"
            @click="toggleFilter('no_metadata')"
          >
            <ToggleCustom v-model="_inputModels.no_metadata" class="mr-2" />
            {{ $t('overview.listPage.noMetadataAvailable') }}
          </div>
          <div
            class="truncate border-t border-gray-300 py-2 px-3 text-dialog"
            @click="toggleFilter('deprecated')"
          >
            <ToggleCustom v-model="_inputModels.deprecated" class="mr-2" />
            {{ $t('overview.listPage.deprecated') }}
          </div>
          <Accordion
            :text="$t('overview.listPage.dataSpace')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.categories')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.tags')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.datasetConfigurations')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.accessType')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.dataProvider')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              Test
            </div>
          </Accordion>
          <Accordion
            :text="$t('overview.listPage.dataset')"
            class="border-t border-gray-300 pt-2 text-dialog"
            button-class="font-semibold text-gray-900 pb-2 px-4"
          >
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              {{ $t('overview.listPage.aggregated') }}
            </div>
            <div class="flex border-t border-gray-300 py-2 px-4">
              <CheckboxCustom class="mr-2" />
              {{ $t('overview.listPage.single') }}
            </div>
          </Accordion>

          <!-- Action buttons -->
          <div class="mx-3 flex gap-3">
            <div
              class="flex flex-1 cursor-pointer select-none items-center justify-center gap-1 rounded border border-gray-300 py-1 text-sm text-green-400"
              @click="resetFilters"
            >
              <IconDelete class="h-4 w-4 text-error" />
              {{ $t('overview.listPage.resetFilters') }}
            </div>
            <div
              class="flex flex-1 cursor-pointer select-none items-center justify-center gap-1 rounded border border-gray-300 bg-green-400 py-1 text-sm text-white md:hidden"
              @click="hideFilters"
            >
              {{ $t('overview.listPage.applyFilters') }}
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="flex min-h-screen w-full flex-col gap-4">
          <div v-if="isOtherDatasetsLoading" class="animate-pulse">
            {{ t('overview.listPage.loadOtherDatasets') }}
          </div>
          <template v-else>
            <OverviewCardItem
              v-for="(dataset, index) in visibleDatasets"
              :key="index"
              :dataset="dataset"
              :data-test="`dataset-card-${dataset.id}`"
              class="break-words"
            />
          </template>
        </div>
      </div>

      <CardDivider />

      <PartnersAndContributors />
    </PageGridContent>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const { t } = useI18n();

import AppLayout from '../../../layouts/AppLayout.vue';
import OverviewCardItem from './OverviewCardItem.vue';
import PartnersAndContributors from '../../../components/partners/PartnersAndContributors.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import PageGridContent from '../../../components/content/PageGridContent.vue';
import { useI18n } from 'vue-i18n';
import { useMetaDataDatasets, useOtherDatasets } from './useDatasets';
import ToggleCustom from '../../../components/toggle/ToggleCustom.vue';
import InputCustom from '../../../components/input/InputCustom.vue';
import Accordion from '../../../components/accordion/Accordion.vue';
import CheckboxCustom from '../../../components/checkbox/CheckboxCustom.vue';
import IconDelete from '../../../components/svg/IconDelete.vue';
import IconFilter from '../../../components/svg/IconFilter.vue';
import IconClose from '../../../components/svg/IconClose.vue';

interface FilterObject {
  key: string;
  value?: string;
}

const defaultFilters = {
  searchVal: '',
  applied: {} as { [key: string]: FilterObject },
};
const _inputModels = ref({
  no_metadata: false,
  deprecated: false,
});

const isFiltersModalVisible = ref(false);
const filters = ref(defaultFilters);

// Computed
const visibleDatasets = computed(() => {
  let datasets = tourismDatasets.value;

  if (filters.value.searchVal) {
    datasets = datasets.filter((dataset) =>
      dataset.shortname
        .toLowerCase()
        .includes(filters.value.searchVal.toLowerCase())
    );
  }

  for (const [filterKey, filter] of Object.entries(filters.value.applied)) {
    switch (filterKey) {
      case 'deprecated':
        datasets = datasets.filter(
          (dataset) =>
            (dataset[filterKey] as string | boolean) === (filter.value || true)
        );
        break;
    }
  }

  return datasets;
});

// Methods
const showFilters = () => {
  isFiltersModalVisible.value = true;
};

const hideFilters = () => {
  isFiltersModalVisible.value = false;
};

const resetFilters = () => {
  filters.value = defaultFilters;
  hideFilters();
};

const isFilterEnabled = (key: string) => {
  return typeof filters.value.applied[key] !== 'undefined';
};

const toggleFilter = (key: string, value?: string) => {
  if (isFilterEnabled(key)) {
    unsetFilter(key);
  } else {
    setFilter(key, value);
  }
};

const setFilter = (key: string, value?: string) => {
  filters.value.applied[key] = getFilterObject(key, value);
};

const unsetFilter = (key: string) => {
  delete filters.value.applied[key];
};

const getFilterObject = (key: string, value?: string): FilterObject => {
  return {
    key,
    value,
  };
};

// Data fetch
const { metaDataDatasets, accessTypeOptions, currentAccessType } =
  useMetaDataDatasets();

const { isOtherDatasetsLoading, tourismDatasets } =
  useOtherDatasets(metaDataDatasets);
</script>
