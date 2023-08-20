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
            {{ isOtherDatasetsLoading ? '...' : visibleDatasets?.length }}
            {{
              !isOtherDatasetsLoading && visibleDatasets?.length === 1
                ? t('overview.listPage.datasetFound')
                : t('overview.listPage.datasetsFound')
            }}
          </h1>
          <InputCustom
            v-model="filters.searchVal"
            :placeholder="t('overview.listPage.searchDataset')"
            type="search"
            input-classes="w-full md:w-64"
          />
        </div>
      </div>

      <div class="flex w-full flex-col items-start gap-8 md:flex-row">
        <!-- Mobile filters button -->
        <div
          class="flex w-full shrink-0 items-center gap-2 rounded border border-gray-300 px-3 py-2 font-semibold text-green-400 md:hidden"
          @click="showFilters"
        >
          <div class="grow">
            {{ t('overview.listPage.showFilters') }}
          </div>
          <div
            v-if="appliedFiltersNum"
            class="rounded bg-gray-200 px-2 text-sm text-gray-900"
          >
            {{ appliedFiltersNum }}
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
          <div
            class="fixed top-0 z-10 flex w-full items-center gap-1 bg-white md:relative"
          >
            <h3
              class="flex grow items-center gap-2 px-3 py-2 text-2xl font-semibold text-gray-900"
            >
              {{ t('overview.listPage.filter') }}
              <div
                v-if="appliedFiltersNum"
                class="rounded bg-gray-200 px-2 text-sm text-gray-900"
              >
                {{ appliedFiltersNum }}
              </div>
            </h3>

            <div
              class="mx-3 hidden cursor-pointer select-none items-center justify-center gap-1 rounded border border-gray-300 px-2 py-1 text-sm text-green-400 md:flex"
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
          <div class="h-full overflow-y-auto py-14 md:h-auto md:p-0">
            <div
              class="truncate border-t border-gray-300 px-3 py-2 text-dialog"
              @click="toggleFilter('hasNoMetadata')"
            >
              <ToggleCustom v-model="_inputModels.no_metadata" class="mr-2" />
              {{ $t('overview.listPage.noMetadataAvailable') }}
            </div>
            <div
              class="truncate border-t border-gray-300 px-3 py-2 text-dialog"
              @click="toggleFilter('deprecated')"
            >
              <ToggleCustom v-model="_inputModels.deprecated" class="mr-2" />
              {{ $t('overview.listPage.deprecated') }}
            </div>
            <Accordion
              v-for="filter in dynamicFilters"
              :key="filter.id"
              :text="filter.name"
              button-class="font-semibold text-gray-900 pb-2 px-4"
              :badge-value="getActiveFiltersCountOfGroup(filter.id as tourismMetaDataIndexes)"
              class="border-t border-gray-300 pt-2 text-dialog"
            >
              <div
                v-for="option in filter.data"
                :key="option.key"
                class="flex border-t border-gray-300 px-4 py-2"
              >
                <CheckboxCustom
                  v-model="_inputModels[getInputModelId(filter.id as tourismMetaDataIndexes, option.value)]"
                  class="mr-2"
                  @input="toggleFilter(filter.id, option.key)"
                />
                {{ option.value }}
              </div>
            </Accordion>
          </div>

          <!-- Action buttons -->
          <div
            class="fixed bottom-0 flex w-full gap-3 bg-white px-3 py-4 md:relative md:mx-3 md:w-auto md:p-0"
          >
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
            <div
              v-if="!visibleDatasets.length"
              class="flex items-center justify-center rounded border border-gray-300 p-3"
            >
              {{ t('overview.listPage.noDatasetFoundWithSelectedFilters') }}
            </div>
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
import lodash from 'lodash';

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
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

type tourismMetaDataIndexes =
  | 'dataSpace'
  | 'categories'
  | 'tags'
  | 'datasetConfigurations'
  | 'access'
  | 'sources'
  | 'dataset';

interface Filters {
  searchVal: string;
  applied: { [key: string]: FilterObject };
}

interface FilterObject {
  key: string;
  value?: string;
}

interface FilterSelectItem {
  key: string;
  value: string;
}

interface DynamicFilter {
  id: string;
  name: string;
  data: FilterSelectItem[];
}

const defaultFilters = {
  searchVal: '',
  applied: {} as { [key: string]: FilterObject },
};
const _inputModels = ref({
  no_metadata: false,
  deprecated: false,
} as { [key: string]: boolean });

const isFiltersModalVisible = ref(false);
const filters = ref(lodash.cloneDeep(defaultFilters) as Filters);

// Methods
const mapDatasetsKeyArrayToFilterItems = (
  datasets: TourismMetaData[],
  key: tourismMetaDataIndexes
) => {
  const addedProps = {} as { [key: string]: boolean };
  let finalList = [] as FilterSelectItem[];

  datasets.forEach((dataset) => {
    if (dataset[key]) {
      (dataset[key]! as string[]).forEach((propName) => {
        if (!addedProps[propName]) {
          addedProps[propName] = true;
          finalList.push(getFilterSectionItemObject(propName, propName));
          _inputModels.value[
            getInputModelId(key as tourismMetaDataIndexes, propName)
          ] = false; // NOTE: defining the object key here it's necessary to properly rest the object programmatically
        }
      });
    }
  });

  return finalList;
};

const mapDatasetsKeyStringToFilterItems = (
  datasets: TourismMetaData[],
  key: tourismMetaDataIndexes
) => {
  const addedProps = {} as { [key: string]: boolean };
  let finalList = [] as FilterSelectItem[];

  datasets.forEach((dataset) => {
    const propName = dataset[key] as string;
    if (propName) {
      if (!addedProps[propName]) {
        addedProps[propName] = true;
        finalList.push(getFilterSectionItemObject(propName, propName));
        _inputModels.value[
          getInputModelId(key as tourismMetaDataIndexes, propName)
        ] = false; // NOTE: defining the object key here it's necessary to properly rest the object programmatically
      }
    }
  });

  return finalList;
};

const showFilters = () => {
  isFiltersModalVisible.value = true;
};

const hideFilters = () => {
  isFiltersModalVisible.value = false;
};

const resetFilters = () => {
  filters.value = lodash.cloneDeep(defaultFilters);

  for (const [key] of Object.entries(_inputModels.value)) {
    _inputModels.value[key] = false;
  }
  hideFilters();
};

const isFilterEnabled = (key: string, value?: string) => {
  const filterFullKey = getFilterFullKey(key, value);
  return typeof filters.value.applied[filterFullKey] !== 'undefined';
};

const toggleFilter = (key: string, value?: string) => {
  if (isFilterEnabled(key, value)) {
    unsetFilter(key, value);
  } else {
    setFilter(key, value);
  }
};

const setFilter = (key: string, value?: string) => {
  const filterFullKey = getFilterFullKey(key, value);
  filters.value.applied[filterFullKey] = getFilterObject(key, value);
};

const unsetFilter = (key: string, value?: string) => {
  const filterFullKey = getFilterFullKey(key, value);
  delete filters.value.applied[filterFullKey];
};

const getFilterFullKey = (key: string, value?: string) => {
  return key + (value ? '-' + value : '');
};

const getFilterObject = (key: string, value?: string): FilterObject => {
  return {
    key,
    value,
  };
};

const getInputModelId = (matchType: tourismMetaDataIndexes, match: string) => {
  return matchType + '-' + match;
};

const getDynamicFilterObject = (
  id: string,
  name: string,
  data: FilterSelectItem[]
): DynamicFilter => {
  return {
    id,
    name,
    data,
  };
};

const getFilterSectionItemObject = (
  key: string,
  value: string
): FilterSelectItem => {
  return {
    key,
    value,
  };
};

const getActiveFiltersCountOfGroup = (groupId: tourismMetaDataIndexes) => {
  let count = 0;

  for (const [filterId] of Object.entries(filters.value.applied)) {
    if (filterId.startsWith(groupId + '-')) {
      count++;
    }
  }

  return count;
};

// Computed
const dynamicFilters = computed(
  () =>
    [
      getDynamicFilterObject(
        'dataSpace',
        t('overview.listPage.dataSpace'),
        availableDataSpaces.value
      ),
      getDynamicFilterObject(
        'categories',
        t('overview.listPage.categories'),
        availableCategories.value
      ),
      getDynamicFilterObject(
        'tags',
        t('overview.listPage.tags'),
        availableTags.value
      ),
      getDynamicFilterObject(
        'datasetConfigurations',
        t('overview.listPage.datasetConfigurations'),
        [] // TODO
      ),
      getDynamicFilterObject(
        'access',
        t('overview.listPage.accessType'),
        availableAccessTypes.value
      ),
      getDynamicFilterObject(
        'sources',
        t('overview.listPage.dataProvider'),
        availableDataProviders.value
      ),
      getDynamicFilterObject(
        'dataset',
        t('overview.listPage.dataset'),
        availableDatasetFilters.value // TODO
      ),
    ] as DynamicFilter[]
);

const allDatasets = computed(() => {
  return [...metaDataDatasets.value, ...tourismDatasets.value];
});

const visibleDatasets = computed(() => {
  let datasets = allDatasets.value;

  if (filters.value.searchVal) {
    datasets = datasets.filter((dataset) =>
      dataset.shortname
        .toLowerCase()
        .includes(filters.value.searchVal.toLowerCase())
    );
  }

  for (const [_, filter] of Object.entries(filters.value.applied)) {
    switch (filter.key) {
      case 'hasNoMetadata':
      case 'deprecated':
      case 'dataSpace':
      case 'access':
        datasets = datasets.filter(
          (dataset) =>
            (dataset[filter.key as tourismMetaDataIndexes] as
              | string
              | boolean) === (filter.value || true)
        );
        break;

      case 'tags':
      case 'categories':
      case 'sources':
        datasets = datasets.filter((dataset) => {
          return (
            dataset[filter.key as tourismMetaDataIndexes]! as String[]
          ).find((value) => filter.value === value);
        });
        break;
    }
  }

  return datasets;
});

const availableDataSpaces = computed(() => {
  return mapDatasetsKeyStringToFilterItems(allDatasets.value, 'dataSpace');
});

const availableCategories = computed(() => {
  return mapDatasetsKeyArrayToFilterItems(allDatasets.value, 'categories');
});

const availableDataProviders = computed(() => {
  return mapDatasetsKeyArrayToFilterItems(allDatasets.value, 'sources');
});

const availableTags = computed(() => {
  return mapDatasetsKeyArrayToFilterItems(allDatasets.value, 'tags');
});

const availableAccessTypes = computed(() => {
  return mapDatasetsKeyStringToFilterItems(allDatasets.value, 'access');
});

const availableDatasetFilters = computed(() => {
  const filters = [
    getFilterSectionItemObject('aggregated', t('overview.listPage.aggregated')),
    getFilterSectionItemObject('signgle', t('overview.listPage.single')),
  ];

  filters.forEach((filter) => {
    _inputModels.value[
      getInputModelId('dataset' as tourismMetaDataIndexes, filter.value)
    ] = false;
  });

  return filters;
});

const appliedFiltersNum = computed(() => {
  return Object.keys(filters.value.applied).length;
});

// Data fetch
const { metaDataDatasets } = useMetaDataDatasets();

const { isOtherDatasetsLoading, tourismDatasets } =
  useOtherDatasets(metaDataDatasets);
</script>
