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
      v-if="isLoading"
      class="loading-indicator mt-4 animate-spin self-center text-dialog"
    />
    <template v-else>
      <AlertError v-if="isError" title="Error">
        {{ error }}
      </AlertError>
      <template v-else>
        <div v-for="(element, index) in viewElements" :key="index">
          <span class="text-sm font-semibold">{{ element.title }}: </span>
          <ComponentRenderer
            :tag-name="element.component"
            :attributes="
              buildTargetFromMapping(recordData, element, element.params)
            "
          />
        </div>
        <RecordDetailLinks :current-dataset="currentDataset" :links="links" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import ComponentRenderer from '../../../../../components/componentRenderer/ComponentRenderer.vue';
import IconCycle from '../../../../../components/svg/IconCycle.vue';
import { buildTargetFromMapping } from '../../../config/mapping/utils';
import { computeDatasetViewLocations } from '../../../location/datasetViewLocation';
import { useFetchSingleRecord } from '../fetch/useFetchSingleRecord';
import { MarkerFeature } from '../types';
import RecordDetailLinks from './RecordDetailLinks.vue';
import { useCurrentDataset } from './useCurrentDataset';
import { useViewElements } from './useViewElements';
import { getApiDomainFromMetaData } from '../../../../metaDataConfig/utils';

const props = defineProps<{ activeMarker: MarkerFeature }>();
const { activeMarker } = toRefs(props);

const datasetId = computed(() => activeMarker.value.datasetId);
const recordId = computed(() => activeMarker.value.id);

const { currentDataset } = useCurrentDataset(datasetId);

const apiType = computed(() => currentDataset.value?.apiType);
const externalLink = computed(() => currentDataset.value?.externalLink);

const { isLoading, isError, error, recordUrl, recordData } =
  useFetchSingleRecord(apiType, externalLink, recordId);

const { viewElements } = useViewElements(recordUrl, currentDataset);

const links = computed(() => {
  if (currentDataset.value == null || activeMarker.value == null) {
    return;
  }

  const domain = getApiDomainFromMetaData(currentDataset.value);
  const pathSegments = currentDataset.value.pathSegments;
  const query = currentDataset.value.apiFilter;
  const id = activeMarker.value.id;

  return computeDatasetViewLocations(domain, pathSegments, query, id);
});
</script>
