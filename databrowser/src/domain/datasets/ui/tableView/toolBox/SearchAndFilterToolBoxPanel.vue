<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxPanel>
    <ToolBoxCard v-if="datasetDomain === 'tourism'">
      <ToolBoxCardHeader>
        <div class="flex items-center gap-2">
          {{
            t('datasets.listView.toolBox.searchAndFilter.basicSearch.header')
          }}
          <InfoSearch />
        </div>
        <TagCustom text="BETA" type="info" class="font-normal" />
      </ToolBoxCardHeader>
      <ToolBoxCardBody>
        <InputSearch
          id="search-dataset"
          :model-value="searchfilter"
          @search="search"
        />
      </ToolBoxCardBody>
    </ToolBoxCard>
    <ToolBoxCard>
      <ToolBoxCardHeader>
        <div class="flex items-center gap-2">
          {{
            t('datasets.listView.toolBox.searchAndFilter.otherFilters.header')
          }}
          <InfoFilter />
        </div>
        <ResetAllFilters @reset-all-filters="removeAllFilters" />
      </ToolBoxCardHeader>

      <ToolBoxCardBody
        v-for="(filter, index) in tableFilters"
        :key="`${filter.propertyPath}-${index}`"
        class="flex flex-col gap-2"
      >
        <button
          class="self-end p-1 text-delete"
          @click="removeFilterByIndex(index)"
        >
          <IconDelete />
        </button>

        <div class="flex items-center gap-2">
          <SelectCustom
            :options="filterColSelectOptions"
            :show-value-as-label-fallback="true"
            :value="filter.propertyPath"
            :z-index="30"
            class="basis-1/2"
            @change="filter.propertyPath = $event"
          />
          <SelectCustom
            :options="filterTypeSelectOptions"
            :value="filter.operator"
            :z-index="30"
            class="basis-1/2"
            @change="updateFilter(index, $event, filter.value, false)"
          />
        </div>
        <InputFilter
          v-if="filter.operator !== 'isnull' && filter.operator !== 'isnotnull'"
          :id="`filter-${filter.propertyPath}`"
          :model-value="filter.value?.toString()"
          @update:model-value="filter.value = $event"
          @filter="updateFilter(index, filter.operator, $event, true)"
        />
      </ToolBoxCardBody>
      <ToolBoxCardBody>
        <ButtonCustom
          class="flex items-center gap-2 p-2 py-1"
          :size="Size.xs"
          :variant="Variant.ghost"
          @click="addEmptyFilter"
        >
          <IconClose class="h-5 w-5 rotate-45" />
          {{
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.addNewFilter'
            )
          }}
        </ButtonCustom>
      </ToolBoxCardBody>
    </ToolBoxCard>
  </ToolBoxPanel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../../components/button/types';
import InputFilter from '../../../../../components/input/InputFilter.vue';
import InputSearch from '../../../../../components/input/InputSearch.vue';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import IconClose from '../../../../../components/svg/IconClose.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import TagCustom from '../../../../../components/tag/TagCustom.vue';
import { useDatasetBaseInfoStore } from '../../../config/store/datasetBaseInfoStore';
import { useDatasetQueryStore } from '../../../location/store/datasetQueryStore';
import ToolBoxCard from '../../toolBox/ToolBoxCard.vue';
import ToolBoxCardBody from '../../toolBox/ToolBoxCardBody.vue';
import ToolBoxCardHeader from '../../toolBox/ToolBoxCardHeader.vue';
import ToolBoxPanel from '../../toolBox/ToolBoxPanel.vue';
import ResetAllFilters from '../filter/ResetAllFilters.vue';
import {
  mobilityFilterTypeSelectOptions,
  tourismFilterTypeSelectOptions,
} from '../filter/filterSelectOptions';
import { useTableFilterStore } from '../filter/tableFilterStore';
import InfoFilter from './InfoFilter.vue';
import InfoSearch from './InfoSearch.vue';
import { FilterOperator, FilterValue } from '../filter/types';

const { t } = useI18n();

const searchfilter = useDatasetQueryStore().handle('searchfilter');

const search = (term: string) => {
  const value = term === '' ? undefined : term;
  searchfilter.value = value;
};

const { datasetDomain } = storeToRefs(useDatasetBaseInfoStore());
const filterTypeSelectOptions = computed(() => {
  if (datasetDomain.value === 'tourism') {
    return tourismFilterTypeSelectOptions;
  }
  if (datasetDomain.value === 'mobility') {
    return mobilityFilterTypeSelectOptions;
  }
  return [];
});

const { tableFilters, filterColSelectOptions } = storeToRefs(
  useTableFilterStore()
);
const {
  addEmptyFilter,
  removeAllFilters,
  removeFilterByIndex,
  updateFilterValueByIndex,
} = useTableFilterStore();

const updateFilter = (
  index: number,
  operator: FilterOperator,
  value: FilterValue,
  unconditionallyApplyFilters: boolean
) => {
  // Apply filters if operator is 'isnull' or 'isnotnull' or if the user
  // explicitly wants to apply the filters
  const applyFilters =
    unconditionallyApplyFilters ||
    operator === 'isnull' ||
    operator === 'isnotnull';
  updateFilterValueByIndex(index, operator, value, applyFilters);
};
</script>
