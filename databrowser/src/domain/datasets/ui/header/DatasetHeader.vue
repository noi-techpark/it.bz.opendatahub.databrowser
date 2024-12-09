<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <header class="flex flex-wrap items-center py-2 text-xs md:py-0">
    <!-- Dataset title -->
    <div
      class="mb-2 flex w-full items-center justify-between py-3 md:mb-0 md:w-auto"
    >
      <span
        v-if="hasConfig"
        class="mr-1 text-sm font-bold text-black md:w-auto md:text-base"
      >
        <DatasetHeaderOverlay :active="selectOpen">
          <SelectCustom
            :grouped-options="selectOptions"
            :value="currentDataset"
            :show-search-when-at-least-count-options="1"
            extra-height
            mobile-full-screen
            class="mr-1 w-64"
            no-min-height
            @change="handleDatasetChange"
            @open="handleSelectOpen"
          />
        </DatasetHeaderOverlay>
      </span>
      <span v-else class="mr-3 text-base">
        {{ t('datasets.header.noViewConfig') }}
      </span>
    </div>

    <!-- More info -->
    <DatasetHeaderMoreInfoPopup />

    <!-- Popup -->
    <DatasetHeaderConfigPopup
      :picked="source"
      :class="{
        'animate-pulse rounded outline outline-green-500': !hasConfig,
        'mr-2': true,
      }"
      @picked-change="changeSource($event)"
    />

    <DatasetHeaderSearch
      v-if="isTableView"
      :open="inputSearchOpen"
      class="flex md:hidden"
      @open="handleInputSearchOpen"
    />

    <DatasetHeaderOverlay
      :active="inputSearchOpen"
      padded
      @overlay-click="handleInputSearchOpen(false)"
    >
      <InputSearch
        v-if="isTableView"
        id="search-dataset"
        :class="[inputSearchOpen ? 'flex' : 'hidden md:flex']"
        :model-value="searchfilter"
        @search="search"
      />
    </DatasetHeaderOverlay>

    <!-- Show information if current view is auto generated -->
    <TagCustom
      v-if="source === 'generated'"
      :text="t('datasets.header.viewGeneratedConfig')"
      class="ml-1"
      size="xs"
      type="yellow"
      has-dot
    />

    <div class="ml-auto flex gap-2">
      <AddRecordButton
        v-if="addRecordSupported"
        class="mr-2 md:flex"
        data-test="desktop-add-record-link"
      />

      <!-- Language picker -->
      <LanguagePicker
        v-if="showLanguagePicker"
        :current-language="currentLanguage"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguagePicker from '../../../../components/language/LanguagePicker.vue';
import TagCustom from '../../../../components/tag/TagCustom.vue';
import { useDatasetBaseInfoStore } from '../../config/store/datasetBaseInfoStore';
import { DatasetConfigSource } from '../../config/types';
import { useDatasetQueryStore } from '../../location/store/datasetQueryStore';
import { useDatasetPermissionStore } from '../../permission/store/datasetPermissionStore';
import AddRecordButton from './AddRecordButton.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import DatasetHeaderMoreInfoPopup from './DatasetHeaderMoreInfoPopup.vue';
import DatasetHeaderOverlay from './DatasetHeaderOverlay.vue';
import DatasetHeaderSearch from './DatasetHeaderSearch.vue';
import InputSearch from '../../../../components/input/InputSearch.vue';
import SelectCustom from '../../../../components/select/SelectCustom.vue';
import {
  GroupSelectOption,
  SelectValue,
} from '../../../../components/select/types';
import {
  useMetaDataDatasets,
  useOtherDatasets,
} from '../../../../pages/datasets/overview/useDatasets';
import { LocationQuery, useRoute, useRouter } from 'vue-router';
import { computeTableLocation } from '../../location/datasetViewLocation';
import { TourismMetaData } from '../../../metaDataConfig/tourism/types';
import { useDatasetViewStore } from '../../view/store/datasetViewStore';
import { useSessionStorage } from '@vueuse/core';
import { computeRouteDomain } from '../../location/routeDomain';
import { computeRoutePath } from '../../location/routePath';
import { getApiDomain } from '../../../../domain/datasets/utils';

const { view, isTableView } = storeToRefs(useDatasetViewStore());

const { t } = useI18n();

const router = useRouter();
const route = useRoute();
const SESSION_DATASET_KEY = 'currentDataset';

// Data fetch
const { metaDataDatasets } = useMetaDataDatasets();

const { tourismDatasets } = useOtherDatasets(metaDataDatasets);

const { datasetDomain, hasConfig, source } = storeToRefs(
  useDatasetBaseInfoStore()
);

const allDatasets = computed(() => {
  return [...metaDataDatasets.value, ...tourismDatasets.value];
});

const relatedDatasetsValues = computed(() => {
  const _view = view.value;

  if (!_view || !('elements' in _view)) return [];

  const _relatedDatasetsValues = [];

  for (const item of _view.elements) {
    if (!('params' in item) || !item.params?.referenceBasePath) {
      continue;
    }

    _relatedDatasetsValues.push(item.params.referenceBasePath);
  }

  return _relatedDatasetsValues;
});

const allDatasetsOptions = computed<GroupSelectOption>(() => {
  return {
    name: 'All datasets',
    options: allDatasets.value.map((item) => ({
      label: item.shortname,
      value: getDatasetSelectValue(item),
    })),
  };
});

const relatedDatasetsOptions = computed<GroupSelectOption | undefined>(() => {
  if (!relatedDatasetsValues.value?.length) return undefined;

  const _options = allDatasetsOptions.value.options.filter(
    (item) =>
      item.value && relatedDatasetsValues.value.includes(item.value.toString())
  );

  if (!_options.length) return undefined;

  return {
    name: 'Related datasets',
    options: _options,
  };
});

const selectOptions = computed<GroupSelectOption[]>(() => {
  const _options = [allDatasetsOptions.value];

  if (relatedDatasetsOptions.value) {
    _options.unshift(relatedDatasetsOptions.value);
  }

  return _options;
});

const handleInputSearchOpen = (state: boolean) => {
  inputSearchOpen.value = state;
};

const handleSelectOpen = (state: boolean) => {
  selectOpen.value = state;
};

const handleDatasetChange = (value: string) => {
  const dataset = allDatasets.value.find(
    (item) => getDatasetSelectValue(item) === value
  );

  if (!dataset) return;

  const { pathSegments, apiFilter } = dataset;

  const domain = getDomainOfDataset(dataset);

  router.push(computeTableLocation(domain, pathSegments, apiFilter));
  setCurrentDataset(getDatasetSelectValue(dataset));
};

const getDomainOfDataset = (dataset: TourismMetaData) => {
  // TODO: fix this as referenced in OverviewLinkTable
  //return dataset.baseUrl.includes('tourism') ? 'tourism' : 'mobility';
  return getApiDomain(dataset) ?? 'mobility';
};

const currentDataset = ref<SelectValue>('');
const selectOpen = ref<boolean>();
const inputSearchOpen = ref<boolean>();

const searchfilter = useDatasetQueryStore().handle('searchfilter');
const search = (term: string) => {
  const value = term === '' ? undefined : term;
  searchfilter.value = value;
  handleInputSearchOpen(false);
};

const { addRecordSupported } = storeToRefs(useDatasetPermissionStore());

const currentLanguage = useDatasetQueryStore().handle('language');

const changeSource = (value: DatasetConfigSource) => {
  source.value = value;
};

const showLanguagePicker = computed(() => datasetDomain.value === 'tourism');

const getDatasetSelectValue = (dataset: TourismMetaData) => {
  const domain = getDomainOfDataset(dataset);
  const { pathSegments, apiFilter } = dataset;

  return getSelectValue(domain, pathSegments, apiFilter);
};

const getSelectValue = (
  domain: string,
  pathSegments: string[],
  apiFilter: Record<string, string> | LocationQuery
) => {
  const apiFilterSegmentValues = [];
  for (const key in apiFilter) {
    const value = apiFilter[key];
    apiFilterSegmentValues.push(`${key}=${value}`);
  }

  return `/${domain}/${pathSegments.join('/')}${
    apiFilterSegmentValues.length ? '?' + apiFilterSegmentValues.join('&') : ''
  }`;
};

const getClosestMatch = (
  value: string,
  options: string[]
): string | undefined => {
  let closestMatch: string | undefined = undefined;
  let maxMatchLength = 0;

  options.forEach((option) => {
    const matchLength = getCommonPrefixLength(value, option);
    if (matchLength > maxMatchLength) {
      maxMatchLength = matchLength;
      closestMatch = option;
    }
  });

  return closestMatch;
};

const getCommonPrefixLength = (str1: string, str2: string): number => {
  let i = 0;
  while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
    i++;
  }
  return i;
};

const setCurrentDataset = (dataset: string) => {
  const currentSessionDataset = useSessionStorage(SESSION_DATASET_KEY, '');

  currentDataset.value = dataset;
  currentSessionDataset.value = dataset;
};

watch(
  () => selectOptions.value,
  (_options) => {
    const allDatasets = _options.at(-1);

    const routeDomain = computeRouteDomain(route);
    const routePath = computeRoutePath(route);

    if (!allDatasets || !routeDomain) return;

    const currentRouteAsSelectValue = getSelectValue(
      routeDomain,
      routePath,
      route.query
    );

    const dataset = getClosestMatch(
      currentRouteAsSelectValue,
      allDatasets.options.map((item) => item.value?.toString() || '')
    );

    if (!dataset) return;

    const currentSessionDataset = useSessionStorage(SESSION_DATASET_KEY, '');
    let sessionDataset = null;

    // NOTE: this is a provisional solution to handle url change and at least refresh the dataset when its base name its changed. See issue #602 for more details
    if (currentSessionDataset.value) {
      let [currentDatasetPath] = currentSessionDataset.value.split('?');
      let [foundDatasetPath] = dataset.split('?');

      if (currentDatasetPath === foundDatasetPath) {
        sessionDataset = currentSessionDataset.value;
      }
    }

    if (sessionDataset) {
      currentDataset.value = currentSessionDataset.value;
    } else {
      setCurrentDataset(dataset);
    }
  }
);
</script>
