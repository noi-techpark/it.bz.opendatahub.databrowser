<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex items-center justify-between gap-1">
    {{ title }}
    <div class="flex items-center justify-end gap-1">
      <TooltipCustom v-if="isDeprecated">
        <template #default>
          <div
            class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-deprecated leading-3 text-white"
          >
            <div class="h-1 w-1 rounded-full bg-white"></div>
          </div>
        </template>
        <template #container>
          <p>This field is deprecated. It is not recommended to use it</p>
        </template>
      </TooltipCustom>
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
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import PopoverContentHeader from '../../../../components/popover/PopoverContentHeader.vue';
import PopoverCustom from '../../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../../components/popover/PopoverCustomPanel.vue';
import IconFilter from '../../../../components/svg/IconFilter.vue';
import IconSortAsc from '../../../../components/svg/IconSortAsc.vue';
import IconSortDesc from '../../../../components/svg/IconSortDesc.vue';
import IconStrokedArrowDown from '../../../../components/svg/IconStrokedArrowDown.vue';
import { PropertyPath } from '../../../datasets/config/types';
import FilterPopoverContent from './filter/FilterPopoverContent.vue';
import { useTableFilterForPropertyPath } from './filter/useTableFilter';
import SortPopoverContent from './sort/SortPopoverContent.vue';
import { useTableSortForPropertyPath } from './sort/useTableSort';
import TooltipCustom from '../../../../components/tooltip/TooltipCustom.vue';

const props = withDefaults(
  defineProps<{
    title: string;
    propertyPath?: PropertyPath;
    isDeprecated?: boolean;
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
