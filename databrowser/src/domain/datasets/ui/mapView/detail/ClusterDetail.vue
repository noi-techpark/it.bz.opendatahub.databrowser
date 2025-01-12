<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col gap-2 break-words h-full">
    <InputSearch v-model="searchTerm" :show-confirm-button="false" />
    <div ref="containterRel" class="h-full relative">
      <!-- <div class="h-full"></div> -->
      <div class="absolute h-full w-full">
        <div v-bind="containerProps" :style="`height: ${height}px`">
          <div v-bind="wrapperProps">
            <div
              v-for="item in virtualList"
              :key="item.index"
              class="truncate py-px"
            >
              <InternalLink
                :to="item.data.route"
                target="_blank"
                :title="item.data.name"
              >
                {{ item.data.name }}
              </InternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import InputSearch from '../../../../../components/input/InputSearch.vue';
import InternalLink from '../../../../../components/link/InternalLink.vue';
import { computeDatasetViewLocations } from '../../../location/datasetViewLocation';
import { ClusterFeature } from '../types';
import { ClusterDetailLink } from './types';
import { useCurrentDataset } from './useCurrentDataset';
import { useLinkSearch } from './useLinkSearch';
import { useElementSize, useVirtualList } from '@vueuse/core';

const props = defineProps<{ activeCluster: ClusterFeature }>();
const { activeCluster } = toRefs(props);

const datasetId = computed(() => activeCluster.value.datasetId);

const { currentDataset } = useCurrentDataset(datasetId);

const allDetailRoutes = computed<ClusterDetailLink[]>(() => {
  if (activeCluster.value == null || currentDataset.value == null) {
    return [];
  }

  const domain = currentDataset.value.baseUrl.includes('tourism')
    ? 'tourism'
    : currentDataset.value.baseUrl.includes('mobility')
      ? 'mobility'
      : 'unknown';
  const pathSegments = currentDataset.value.pathSegments;
  const query = currentDataset.value.apiFilter;

  return activeCluster.value.markers
    .map((marker) => {
      const { detailLocation } = computeDatasetViewLocations(
        domain,
        pathSegments,
        query,
        marker.recordId
      );

      if (detailLocation == null) {
        return null;
      }

      return {
        name: marker.recordName,
        route: detailLocation,
      };
    })
    .filter((link) => link != null)
    .sort((a, b) => a.name.localeCompare(b.name));
});

const { searchTerm, searchResults } = useLinkSearch(allDetailRoutes);

const containterRel = ref(null);
const { height } = useElementSize(containterRel);

const {
  list: virtualList,
  containerProps,
  wrapperProps,
} = useVirtualList(searchResults, {
  itemHeight: 22,
});
</script>
