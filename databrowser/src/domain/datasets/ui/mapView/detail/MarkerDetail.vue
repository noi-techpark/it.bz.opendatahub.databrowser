<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col gap-2 break-words">
    <div>
      <span class="text-sm font-semibold">ID: </span>
      {{ activeMarker.id }}
    </div>

    <IconCycle
      v-if="isDataLoading"
      class="loading-indicator mt-4 animate-spin self-center text-dialog"
    />
    <template v-else>
      <AlertError v-if="isDataError" title="Error">
        {{ error }}
      </AlertError>
      <template v-else>
        <div v-for="(element, index) in viewElements" :key="index">
          <span class="text-sm font-semibold">{{ element.title }}: </span>
          <ComponentRenderer
            :tag-name="element.component"
            :attributes="
              buildTargetFromObjectMapping(
                viewData,
                element.objectMapping,
                element.params
              )
            "
            :object-mapping="element.objectMapping"
          />
        </div>
        <RecordDetailLinks :current-dataset="currentDataset" :links="links" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { computed, toRefs } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import ComponentRenderer from '../../../../../components/componentRenderer/ComponentRenderer.vue';
import IconCycle from '../../../../../components/svg/IconCycle.vue';
import { loadDatasetConfig } from '../../../config/load/datasetConfigLoader';
import { buildTargetFromObjectMapping } from '../../../config/mapping/utils';
import { PropertyConfig } from '../../../config/types';
import { computeDatasetViewLocations } from '../../../location/datasetViewLocation';
import { useFetchSingleRecord } from '../fetch/useFetchSingleRecord';
import { MarkerFeature } from '../types';
import RecordDetailLinks from './RecordDetailLinks.vue';
import { useCurrentDataset } from './useCurrentDataset';

const props = defineProps<{ activeMarker: MarkerFeature }>();
const { activeMarker } = toRefs(props);

const datasetId = computed(() => activeMarker.value.datasetId);

const { currentDataset } = useCurrentDataset(datasetId);

const links = computed(() => {
  if (currentDataset.value == null || activeMarker.value == null) {
    return;
  }

  const domain = currentDataset.value.baseUrl.includes('tourism')
    ? 'tourism'
    : currentDataset.value.baseUrl.includes('mobility')
      ? 'mobility'
      : 'unknown';
  const pathSegments = currentDataset.value.pathSegments;
  const query = currentDataset.value.apiFilter;
  const id = activeMarker.value.id;

  return computeDatasetViewLocations(domain, pathSegments, query, id);
});

const {
  data,
  isLoading: isDataLoading,
  isError: isDataError,
  error,
  recordUrl,
} = useFetchSingleRecord(currentDataset, activeMarker);

const viewData = computed(() => {
  if (data.value == null || currentDataset.value == null) {
    return {};
  }
  const apiType = currentDataset.value.apiType;

  switch (apiType) {
    case 'unknown':
      return data.value;
    case 'content':
      return data.value;
    case 'timeseries':
      return Array.isArray(data.value.data) ? data.value.data[0] : data.value;
    default:
      return {};
  }
});

const viewElements = computedAsync<PropertyConfig[]>(async () => {
  if (recordUrl.value == null || currentDataset.value == null) {
    return [];
  }

  const apiType = currentDataset.value.apiType;

  if (apiType === 'unknown') {
    console.error(
      'Unknown API type, trying to build generated view config',
      currentDataset.value
    );
    const config = await loadDatasetConfig(
      'generated',
      'mobility',
      currentDataset.value.pathSegments
    );

    const viewElements = config?.views?.table?.elements ?? [];

    return viewElements;
  }

  if (apiType === 'content') {
    const { pathname } = new URL(recordUrl.value);
    const path = pathname.split('/').filter((part) => part.length > 0);
    // Remove the last part, which is the record ID
    path.pop();

    const config = await loadDatasetConfig('embedded', 'tourism', path);

    const viewElements = config?.views?.table?.elements ?? [];

    return viewElements;
  }

  if (apiType === 'timeseries') {
    const { pathname } = new URL(recordUrl.value);
    const path = pathname.split('/').filter((part) => part.length > 0);

    const config = await loadDatasetConfig('embedded', 'mobility', path);

    const viewElements = config?.views?.table?.elements ?? [];

    return viewElements;
  }

  return [];
});
</script>
