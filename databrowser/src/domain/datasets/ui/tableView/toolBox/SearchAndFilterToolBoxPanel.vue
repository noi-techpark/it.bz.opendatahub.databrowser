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
        v-for="(filter, index) in filtersFromStore"
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
            :options="filterOptions"
            :show-value-as-label-fallback="true"
            :value="filter.propertyPath"
            :z-index="30"
            class="basis-1/2"
            @change="filter.propertyPath = $event"
          />
          <SelectCustom
            :options="filterSelectOptions"
            :value="filter.operator"
            :z-index="30"
            class="basis-1/2"
            @change="updateFilterValue(index, $event, filter.value)"
          />
        </div>
        <InputFilter
          v-if="filter.operator !== 'isnull' && filter.operator !== 'isnotnull'"
          :id="`filter-${filter.propertyPath}`"
          :model-value="filter.value?.toString()"
          @filter="updateFilterValue(index, filter.operator, $event)"
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
import { SelectOption } from '../../../../../components/select/types';
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
  mobilityFilterSelectOptions,
  tourismFilterSelectOptions,
} from '../filter/filterSelectOptions';
import { useTableFilter } from '../filter/useTableFilter';
import InfoFilter from './InfoFilter.vue';
import InfoSearch from './InfoSearch.vue';

const { t } = useI18n();

defineProps<{ filterOptions: SelectOption[] }>();

const searchfilter = useDatasetQueryStore().handle('searchfilter');

const search = (term: string) => {
  const value = term === '' ? undefined : term;
  searchfilter.value = value;
};

const {
  addEmptyFilter,
  updateFilterValue,
  removeAllFilters,
  removeFilterByIndex,
  filtersFromStore,
} = useTableFilter();

const { datasetDomain } = storeToRefs(useDatasetBaseInfoStore());
const filterSelectOptions = computed(() => {
  if (datasetDomain.value === 'tourism') {
    return tourismFilterSelectOptions;
  }
  if (datasetDomain.value === 'mobility') {
    return mobilityFilterSelectOptions;
  }
  return [];
});
</script>
