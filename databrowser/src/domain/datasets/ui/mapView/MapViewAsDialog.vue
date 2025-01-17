<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DialogFullScreen :is-open="true">
    <div class="flex h-full flex-col overflow-auto">
      <div class="p-2 md:px-6 md:py-3">
        <header class="flex items-center justify-between gap-2">
          <div>
            <span class="text-xl">
              {{
                t('datasets.mapView.headerBig', {
                  selectedDatasetCount: selectedDatasets.length,
                  recordTotal: recordTotal,
                })
              }}
            </span>
            <span>
              {{
                t('datasets.mapView.headerSmall', {
                  datasetTotal: datasets.length,
                })
              }}
            </span>
          </div>
          <div class="relative flex items-center gap-2">
            <LanguagePicker
              class="hidden md:flex"
              :current-language="currentLanguage"
              :z-index="zIndexForSubComponents"
            />
            <ButtonCustom
              :size="Size.xs"
              :variant="Variant.ghost"
              class="flex size-9 items-center justify-center"
              @click="emit('close')"
            >
              <IconClose />
            </ButtonCustom>
          </div>
        </header>

        <div class="flex justify-between gap-2 md:hidden">
          <ButtonCustom
            class="flex w-full items-center justify-center gap-2"
            :variant="Variant.ghost"
            :size="Size.sm"
            :indicator="datasetFilterVisible"
            @click="datasetFilterVisible = !datasetFilterVisible"
          >
            <IconDataset />
            {{ t('datasets.mapView.dataset') }}
          </ButtonCustom>
          <ButtonCustom
            class="flex w-full items-center justify-center gap-2"
            :variant="Variant.ghost"
            :size="Size.sm"
            :indicator="true"
            :disabled="true"
          >
            <IconFilter />
            {{ t('datasets.mapView.filter') }}
          </ButtonCustom>
          <LanguagePicker
            class="md:hidden"
            :current-language="currentLanguage"
            :z-index="zIndexForSubComponents"
          />
        </div>
      </div>
      <div
        class="flex h-full gap-4 overflow-y-auto overflow-x-hidden md:px-6 md:pb-6"
      >
        <DatasetFilter
          :class="[
            datasetFilterVisible
              ? 'basis-11/12 md:basis-1/4'
              : 'hidden md:basis-1/4',
          ]"
          :filter-items="filterItems"
          :datasets-loading="datasetsLoading"
          @selected-dataset-ids="selectedDatasetIds = $event"
        />
        <div
          class="relative h-full w-full md:basis-3/4"
          :class="[{ 'basis-1/12': datasetFilterVisible }]"
          @click="datasetFilterVisible = false"
        >
          <div
            v-if="showMarkerDetail"
            class="absolute bottom-0 z-20 h-4/5 w-full max-w-[40rem] overflow-y-auto overflow-x-hidden p-2 md:bottom-auto md:w-1/3 md:min-w-[25rem]"
          >
            <RecordDetail
              v-if="showMarkerDetail"
              id="record-detail"
              :active-marker="activeMarker"
              :active-cluster="activeCluster"
              @close="closeRecordDetail"
            />
          </div>
          <ClusterMap :init-cluster-map="initClusterMap" />
        </div>
      </div>
    </div>
  </DialogFullScreen>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../components/button/types';
import DialogFullScreen from '../../../../components/dialog/DialogFullScreen.vue';
import LanguagePicker from '../../../../components/language/LanguagePicker.vue';
import IconClose from '../../../../components/svg/IconClose.vue';
import IconDataset from '../../../../components/svg/IconDataset.vue';
import IconFilter from '../../../../components/svg/IconFilter.vue';
import { useMapViewInitializer } from './cluster/useMapViewInitializer';
import { mapViewBaseZIndex } from './consts';
import RecordDetail from './detail/RecordDetail.vue';
import { useFetchDatasets } from './fetch/useFetchDatasets';
import { useFetchRecords } from './fetch/useFetchRecords';
import DatasetFilter from './filter/DatasetFilter.vue';
import { useFilterItems } from './filter/useFilterItems';
import { ClusterFeature, MapSourceWithMetaData, MarkerFeature } from './types';

// Dynamically import SimpleMap to improve code chunking
const ClusterMap = defineAsyncComponent(() =>
  import('../../../../components/map/clusterMap/ClusterMap.vue').then(
    (exports) => exports.default
  )
);

const { t } = useI18n();

const emit = defineEmits<{ (e: 'close'): void }>();

const zIndexForSubComponents = mapViewBaseZIndex + 1;
const datasetFilterVisible = ref(false);

const router = useRouter();
const currentLanguage = computed(() => {
  const language = router.currentRoute.value.query.language;
  return Array.isArray(language) ? language[0] : language;
});

// Fetch datasets
const { datasets, isLoading: datasetsLoading } = useFetchDatasets();

// Handle datasets selected by the filter component
const selectedDatasetIds = ref<Set<string>>(new Set());
const selectedDatasets = computed(() => {
  return datasets.value.filter((d) =>
    selectedDatasetIds.value.has(d.dataset.id)
  );
});

// Fetch records for selected datasets
const recordsByDatasetId = useFetchRecords(selectedDatasets);

// Filter out datasets that have no map source (= no records / not loaded)
const loadedMapSourcesWithMetaData = computed<MapSourceWithMetaData[]>(() => {
  return selectedDatasets.value
    .filter((d) => recordsByDatasetId.value[d.dataset.id]?.mapSource != null)
    .map<MapSourceWithMetaData>((d) => {
      return {
        mapSource: recordsByDatasetId.value[d.dataset.id].mapSource!,
        mapMetaData: d.mapMetaData,
      };
    });
});

// Calculate the total number of records
const recordTotal = computed(() => {
  return Object.values(loadedMapSourcesWithMetaData.value).reduce(
    (acc, { mapSource }) => {
      return mapSource == null ? acc : acc + mapSource.data.features.length;
    },
    0
  );
});

// Build filter items for the filter component
const filterItems = useFilterItems(
  datasets,
  recordsByDatasetId,
  selectedDatasetIds
);

const activeMarker = ref<MarkerFeature>();
const activeCluster = ref<ClusterFeature>();
const showMarkerDetail = ref(false);

const markerClick = (marker: MarkerFeature) => {
  activeCluster.value = undefined;
  activeMarker.value = marker;
  showMarkerDetail.value = true;
};

const clusterClick = (feature: ClusterFeature) => {
  activeMarker.value = undefined;
  activeCluster.value = { ...feature, markers: feature.markers };
  showMarkerDetail.value = true;
};

const closeRecordDetail = () => {
  showMarkerDetail.value = false;
  activeMarker.value = undefined;
  activeCluster.value = undefined;
};

// Build map iniiializer function that is passed to the ClusterMap component
const { initClusterMap } = useMapViewInitializer(
  loadedMapSourcesWithMetaData,
  activeMarker,
  activeCluster,
  markerClick,
  clusterClick
);
</script>

<style>
/* Special class for "cutting" the map marker icons to the right shape with clip-path  */
.clip-marker-icon-clip {
  clip-path: url(#marker-icon-clip);
}
</style>
