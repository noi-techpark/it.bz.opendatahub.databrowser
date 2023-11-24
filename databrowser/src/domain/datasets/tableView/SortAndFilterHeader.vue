<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex items-center justify-between">
    {{ title }}
    <div v-if="!canSort && !canFilter">
      <IconStrokedArrowDown class="h-5 w-5 stroke-current" />
    </div>
    <PopoverCustom v-else>
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
          <template v-if="canSort">
            <PopoverContentHeader class="pb-0">Sort</PopoverContentHeader>
            <SortPopoverContent :property-path="propertyPath" />
          </template>

          <template v-if="canFilter">
            <PopoverContentHeader
              :class="[{ 'py-0': canSort, 'pb-0': !canSort }]"
            >
              Filter
            </PopoverContentHeader>
            <FilterPopoverContent
              :property-path="propertyPath"
              :title="title"
              @add-filter="close"
            />
          </template>
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
import { useTableFilterForPropertyPath } from './filter/useTableFilter';
import { useTableSortForPropertyPath } from './sort/useTableSort';
import SortPopoverContent from './sort/SortPopoverContent.vue';
import FilterPopoverContent from './filter/FilterPopoverContent.vue';
import { PropertyPath } from '../../datasetConfig/types';

const props = withDefaults(
  defineProps<{
    title: string;
    propertyPath?: PropertyPath;
  }>(),
  { propertyPath: undefined }
);

const { title, propertyPath } = toRefs(props);

const { canSort, isCurrentSortAsc, isCurrentSortDesc } =
  useTableSortForPropertyPath(propertyPath);

const { canFilter, isFilterActive } = useTableFilterForPropertyPath(
  title,
  propertyPath
);
</script>
