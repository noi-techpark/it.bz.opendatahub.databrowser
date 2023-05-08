<template>
  <ToolBoxPanel>
    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.listView.toolBox.searchAndFilter.basicSearch.header') }}
        <TagCustom text="BETA" type="info" class="font-normal" />
      </ToolBoxCardHeader>
      <ToolBoxCardBody>
        <InputSearch
          id="search-dataset"
          :model-value="searchFilterAsString"
          @search="search"
        />
      </ToolBoxCardBody>
    </ToolBoxCard>
    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.listView.toolBox.searchAndFilter.otherFilters.header') }}
        <ButtonCustom
          class="flex items-center gap-2 p-2 py-1"
          :size="Size.xs"
          :variant="Variant.ghost"
          @click="removeAllFilters"
        >
          <IconDelete class="text-delete" />
          {{
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.resetAllFilters'
            )
          }}
        </ButtonCustom>
      </ToolBoxCardHeader>
      <ToolBoxCardBody
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
          v-if="filter.operator !== 'isnull' && filter.operator !== 'isnotnull'"
          :id="`filter-${filter.field}`"
          :label-button="
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.filterInputButton'
            )
          "
          :label-placeholder="
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.filterInputPlaceholder'
            )
          "
          :model-value="filter.value?.toString()"
          @search="updateFilterValue(index, filter.operator, $event)"
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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../components/button/types';
import InputSearch from '../../../../components/input/InputSearch.vue';
import SelectCustom from '../../../../components/select/SelectCustom.vue';
import { SelectOption } from '../../../../components/select/types';
import IconClose from '../../../../components/svg/IconClose.vue';
import IconDelete from '../../../../components/svg/IconDelete.vue';
import TagCustom from '../../../../components/tag/TagCustom.vue';
import { useApiQuery, useReplaceWithApiParameters } from '../../../api';
import { useDatasetConfigStore } from '../../../datasetConfig/store/datasetConfigStore';
import ToolBoxCard from '../../toolBox/ToolBoxCard.vue';
import ToolBoxCardBody from '../../toolBox/ToolBoxCardBody.vue';
import ToolBoxCardHeader from '../../toolBox/ToolBoxCardHeader.vue';
import ToolBoxPanel from '../../toolBox/ToolBoxPanel.vue';
import { filterSelectOptions } from '../filter/filterSelectOptions';
import { useTableFilter } from '../filter/useTableFilter';

const { t } = useI18n();

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
