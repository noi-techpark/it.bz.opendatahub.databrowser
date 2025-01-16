<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DialogFullScreen :is-open="isOpen">
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
              class="mr-2 border-none md:mr-0"
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
            Datasets
          </ButtonCustom>
          <ButtonCustom
            class="flex w-full items-center justify-center gap-2"
            :variant="Variant.ghost"
            :size="Size.sm"
            :indicator="true"
            :disabled="true"
          >
            <IconFilter />
            Filter
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
            class="absolute bottom-0 z-20 h-4/5 w-full max-w-[1000px] overflow-y-auto overflow-x-hidden p-2 md:bottom-auto md:w-[33%]"
          >
            <RecordDetail
              v-if="showMarkerDetail"
              id="record-detail"
              :active-marker="activeMarker"
              :active-cluster="activeCluster"
              @close="closeRecordDetail"
            />
          </div>
          <ClusterMap
            :sources="loadedMapSourcesWithMetaData"
            :active-marker="activeMarker"
            :active-cluster="activeCluster"
            @marker-click="markerClick"
            @cluster-click="clusterClick"
          />
        </div>
      </div>
    </div>
  </DialogFullScreen>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../components/button/types';
import DialogFullScreen from '../../../../components/dialog/DialogFullScreen.vue';
import LanguagePicker from '../../../../components/language/LanguagePicker.vue';
import IconClose from '../../../../components/svg/IconClose.vue';
import IconDataset from '../../../../components/svg/IconDataset.vue';
import IconFilter from '../../../../components/svg/IconFilter.vue';
import ClusterMap from './cluster/ClusterMap.vue';
import { mapViewBaseZIndex } from './consts';
import { useFetchDatasets } from './fetch/useFetchDatasets';
import { useFetchRecords } from './fetch/useFetchRecords';
import DatasetFilter from './filter/DatasetFilter.vue';
import { useFilterItems } from './filter/useFilterItems';
import { ClusterFeature, MapSourceWithMetaData, MarkerFeature } from './types';
import RecordDetail from './detail/RecordDetail.vue';

const { t } = useI18n();
const emit = defineEmits<{ (e: 'close'): void }>();

defineProps<{ isOpen: boolean }>();

const router = useRouter();

const zIndexForSubComponents = mapViewBaseZIndex + 1;

const currentLanguage = computed(() => {
  const language = router.currentRoute.value.query.language;
  return Array.isArray(language) ? language[0] : language;
});

const datasetFilterVisible = ref(false);

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
const sourceWithState = useFetchRecords(selectedDatasets);

// Filter out datasets that have no map source (= no records / not loaded)
const loadedMapSourcesWithMetaData = computed<MapSourceWithMetaData[]>(() => {
  return selectedDatasets.value
    .filter((d) => sourceWithState.value[d.dataset.id].mapSource != null)
    .map<MapSourceWithMetaData>((d) => {
      return {
        mapSource: sourceWithState.value[d.dataset.id].mapSource!,
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
  sourceWithState,
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
</script>
