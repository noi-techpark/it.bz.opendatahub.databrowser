<template>
  <div class="flex items-center justify-between">
    {{ title }}
    <PopoverCustom v-if="canSort || canFilter">
      <template #trigger>
        <PopoverCustomButton
          v-slot="{ open }"
          class="flex items-center rounded"
        >
          <IconStrokedArrowDown
            class="h-5 w-5 stroke-current"
            :class="{ 'rotate-180': open }"
          />
          <div class="flex items-center gap-1 text-green-500">
            <IconSortAsc v-if="isCurrentSortAsc" />
            <IconSortDesc v-if="isCurrentSortDesc" />
            <IconFilter v-if="isFilterActive" />
          </div>
        </PopoverCustomButton>
      </template>
      <template #container>
        <PopoverCustomPanel v-slot="{ close }">
          <PopoverContentHeader class="pb-0">Sort</PopoverContentHeader>
          <SortPopoverContent :field="field" />

          <PopoverContentHeader class="py-0">Filter</PopoverContentHeader>
          <FilterPopoverContent
            :field="field"
            :title="title"
            @add-filter="close"
          />
        </PopoverCustomPanel>
      </template>
    </PopoverCustom>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import PopoverContentHeader from '../../../components/popover/PopoverContentHeader.vue';
import PopoverCustom from '../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import IconFilter from '../../../components/svg/IconFilter.vue';
import IconSortAsc from '../../../components/svg/IconSortAsc.vue';
import IconSortDesc from '../../../components/svg/IconSortDesc.vue';
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import { useTableFilterForField } from './filter/useTableFilter';
import { useTableSortForField } from './sort/useTableSort';
import SortPopoverContent from './sort/SortPopoverContent.vue';
import FilterPopoverContent from './filter/FilterPopoverContent.vue';

const props = withDefaults(
  defineProps<{
    title: string;
    field?: string;
  }>(),
  { field: undefined }
);

const { title, field } = toRefs(props);

const { canSort, isCurrentSortAsc, isCurrentSortDesc } =
  useTableSortForField(field);

const { canFilter, isFilterActive } = useTableFilterForField(title, field);
</script>
