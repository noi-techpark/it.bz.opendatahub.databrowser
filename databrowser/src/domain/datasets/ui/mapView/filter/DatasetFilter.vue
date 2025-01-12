<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col gap-2 overflow-auto md:flex">
    <div class="flex flex-1 flex-col overflow-y-hidden rounded border">
      <div class="flex items-center justify-center gap-2 p-2">
        <InputSearch
          id="search-dataset"
          v-model="searchTerm"
          class="flex bg-[#F4F8F9]"
          :show-confirm-button="false"
        />
        <ButtonCustom :size="Size.xs" :variant="Variant.ghost" class="p-2">
          <IconFilter class="size-5 text-green-500" />
        </ButtonCustom>
      </div>
      <div class="relative h-full overflow-y-auto overflow-x-hidden">
        <div
          v-if="datasetsLoading"
          class="absolute inset-0 flex items-center justify-center transition-all"
        >
          <IconCycle class="animate-spin text-dialog" />
        </div>

        <template v-if="!datasetsLoading">
          <DatasetSelector
            v-if="searchResults.length > 0"
            :items="searchResults"
            @toggle-dataset="toggleDataset"
          />
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center"
          >
            <IconEyeWithLid class="size-20" />
            <p class="p-5 text-center">
              {{ t('datasets.mapView.datasetFilter.noSearchResult') }}
            </p>
          </div>
        </template>
      </div>
    </div>
    <MapViewHint class="rounded" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../../components/button/types';
import InputSearch from '../../../../../components/input/InputSearch.vue';
import IconCycle from '../../../../../components/svg/IconCycle.vue';
import IconEyeWithLid from '../../../../../components/svg/IconEyeWithLid.vue';
import IconFilter from '../../../../../components/svg/IconFilter.vue';
import MapViewHint from '../MapViewHint.vue';
import DatasetSelector from './DatasetSelector.vue';
import { SelectDatasetItem } from './types';
import { useDatasetSearch } from './useDatasetSearch';

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'selectedDatasetIds', datasetIds: Set<string>): void;
}>();

const props = defineProps<{
  filterItems: SelectDatasetItem[];
  datasetsLoading: boolean;
}>();

const { filterItems } = toRefs(props);

const selectedDatasets = ref<Record<string, boolean>>({});
const toggleDataset = (id: string) => {
  const selected = !selectedDatasets.value[id];
  selectedDatasets.value = { ...selectedDatasets.value, [id]: selected };
};
watch(selectedDatasets, (selectedDatasetsValue) => {
  const selectedDatasetIds = Object.keys(selectedDatasetsValue).filter(
    (id) => selectedDatasetsValue[id] === true
  );

  emit('selectedDatasetIds', new Set(selectedDatasetIds));
});

const { searchTerm, searchResults } = useDatasetSearch(filterItems);
</script>
