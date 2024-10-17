<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="border border-gray-300 ring-gray-400"
    :class="{
      'max-h-80 overflow-y-auto': !!searchResultsGroupedOptions,
    }"
  >
    <SelectSearchBox
      v-if="showSearch"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <SelectOptionsList
      v-if="!searchResultsGroupedOptions"
      :search-results="searchResults!"
      @keydown="showSearch ? handleKeyDown($event) : true"
    />

    <SelectOptionsList
      v-for="(group, i) in searchResultsGroupedOptions"
      v-else
      :key="group.name"
      :search-results="group.options"
      :group-index="i"
      @keydown="showSearch ? handleKeyDown($event) : true"
      ><template #groupName>
        {{ group.name }}
      </template></SelectOptionsList
    >
  </div>
</template>

<script setup lang="ts">
import { GroupSelectOption, SelectOption } from './types';
import SelectOptionsList from './SelectOptionsList.vue';
import SelectSearchBox from './SelectSearchBox.vue';
import { useOptionsContainerEventHandler } from './useOptionsContainerEventHandler';

type SearchProps =
  | { searchResults: SelectOption[]; searchResultsGroupedOptions?: never }
  | { searchResults?: never; searchResultsGroupedOptions: GroupSelectOption[] };

const props = defineProps<
  {
    modelValue: string;
    showSearch: boolean;
  } & SearchProps
>();

defineEmits(['update:modelValue']);

// Handle options container keydown event
const { handleKeyDown } = useOptionsContainerEventHandler();

// Ensure that either searchResults or searchResultsGroupedOptions is defined, but not both
if (
  (props.searchResults && props.searchResultsGroupedOptions) ||
  (!props.searchResults && !props.searchResultsGroupedOptions)
) {
  throw new Error(
    "You must provide either 'searchResults' or 'searchResultsGroupedOptions', but not both."
  );
}
</script>
