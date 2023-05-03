<template>
  <ToolBox
    :visible="false"
    :tab-names="['Search and filter', 'Export datasets']"
  >
    <TabPanel tabindex="-1">
      <ToolBoxCard label="Basic Search" :break-all="true" :is-filter="true">
        <template #right>
          <TagCustom text="BETA" type="info" class="font-normal" />
        </template>
        <template #default>
          <InputSearch
            id="search-dataset"
            :model-value="searchFilterAsString"
            @search="search"
          />
        </template>
      </ToolBoxCard>
      <ToolBoxFilterCard label="All other filters">
        <template #right>
          <ButtonCustom
            class="flex items-center gap-2 p-2 py-1"
            :size="Size.xs"
            :variant="Variant.ghost"
            @click="removeAllFilters"
          >
            <IconDelete class="text-delete" /> Reset all filters
          </ButtonCustom>
        </template>
        <template #default>
          <ToolBoxAlignment
            v-for="(filter, index) in filtersFromStore"
            :key="`${filter.field}-${index}`"
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
                :options="columnOptions"
                :value="filter.field"
                :z-index="30"
                class="basis-1/2"
                @change="filter.field = $event"
              />
              <SelectCustom
                :options="filterSelectOptions"
                :value="filter.operator"
                :z-index="30"
                class="basis-1/2"
                @change="updateFilterValue(index, $event, filter.value)"
              />
            </div>
            <InputSearch
              v-if="
                filter.operator !== 'isnull' && filter.operator !== 'isnotnull'
              "
              :id="`filter-${filter.field}`"
              label-button="Filter"
              label-placeholder="Insert filter value ..."
              :model-value="filter.value?.toString()"
              @search="updateFilterValue(index, filter.operator, $event)"
            />
          </ToolBoxAlignment>
          <ToolBoxAlignment>
            <ButtonCustom
              class="flex items-center gap-2 p-2 py-1"
              :size="Size.xs"
              :variant="Variant.ghost"
              @click="addEmptyFilter"
            >
              <IconClose class="h-5 w-5 rotate-45" /> Add a new filter
            </ButtonCustom>
          </ToolBoxAlignment>
        </template>
      </ToolBoxFilterCard>

      <ToolBoxFilterCard label="My filters (BETA examples)">
        <template #default>
          <ToolBoxAlignment class="flex flex-col gap-2">
            <router-link
              :to="{ query: { rawfilter: 'and(eq(EventTitle.en,\'test\'))' } }"
            >
              English title = "test"
            </router-link>
            <router-link
              :to="{
                query: {
                  rawfilter:
                    'and(isnull(EventTitle.en),gt(StartDate,\'2022-01-01\'))',
                },
              }"
            >
              English title is null and Date from 2022-01-01
            </router-link>
            <router-link
              :to="{
                query: {
                  rawfilter:
                    'and(ge(StartDate,\'2023-01-01\'),le(StartDate,\'2023-03-01\'))',
                },
              }"
            >
              Date from 2023-01-01 to 2023-03-03
            </router-link>
          </ToolBoxAlignment>
        </template>
      </ToolBoxFilterCard>
    </TabPanel>
    <TabPanel tabindex="-1">
      <ExportDataset :url="url" />
    </TabPanel>
  </ToolBox>
  <div></div>
</template>

<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';
import { computed, ref } from 'vue';
import InputSearch from '../../../components/input/InputSearch.vue';
import SelectCustom from '../../../components/select/SelectCustom.vue';
import { SelectOption } from '../../../components/select/types';
import IconDelete from '../../../components/svg/IconDelete.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { useApiQuery, useReplaceWithApiParameters } from '../../api';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import ExportDataset from '../toolbox/ExportDataset.vue';
import ToolBox from '../toolbox/ToolBox.vue';
import ToolBoxCard from '../toolbox/ToolBoxCard.vue';
import { filterSelectOptions } from './filter/filterSelectOptions';
import { useTableFilter } from './filter/useTableFilter';
import { Size, Variant } from '../../../components/button/types';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconClose from '../../../components/svg/IconClose.vue';
import ToolBoxFilterCard from '../toolbox/ToolBoxFilterCard.vue';
import ToolBoxAlignment from '../toolbox/ToolBoxAlignment.vue';

defineProps<{ url: string }>();

const { updateApiParameterValue, useApiParameter } = useApiQuery();

const searchFilter = useApiParameter('searchfilter');
const searchFilterAsString = computed(
  () => searchFilter.value?.toString() ?? ''
);

const search = (term: string) => {
  const value = term === '' ? undefined : term;
  updateApiParameterValue('searchfilter', value);
};

const { replace } = useReplaceWithApiParameters();

const columns = computed(() => {
  const elements = useDatasetConfigStore().tableView?.elements ?? [];
  return elements.map((element) => {
    const values = Object.values(element.fields ?? {});
    const field = values.length === 1 ? replace(values[0]) : undefined;
    return { title: element.title, field };
  });
});

const tableFilter = useTableFilter(ref({}), ref(''));

const {
  addEmptyFilter,
  updateFilterValue,
  removeAllFilters,
  removeFilterByIndex,
} = tableFilter;

const { filtersFromStore } = tableFilter;

const columnOptions = computed(() =>
  columns.value.map<SelectOption>((col) => ({
    label: col.title,
    value: col.field,
  }))
);
</script>
