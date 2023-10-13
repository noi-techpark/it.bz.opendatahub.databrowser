<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <Listbox v-slot="{ open }" v-model="valueInternal">
      <div ref="trigger" class="text-black">
        <SelectButton
          :id="id"
          :class="[
            !open ? 'rounded' : isBottomPlacement ? 'rounded-t' : 'rounded-b',
            buttonClassNames,
          ]"
          :label="selectedLabel"
          :data-test="`${id}-select-button`"
        />
        <Teleport to="#popper-root">
          <div
            ref="container"
            class="absolute"
            :class="{ hidden: !open, 'z-10': zIndex == null }"
            :style="{
              zIndex: zIndex == null ? undefined : zIndex,
            }"
            :data-test="`${id}-select-options`"
          >
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <SelectOptionsBox
                v-model="searchTerm"
                :show-search="showSearch"
                :search-results="searchResults"
                :class="[{ hidden: !open }, optionsClassNames]"
                :data-test="`${id}-select-options-box`"
              />
            </transition>
          </div>
        </Teleport>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { Listbox } from '@headlessui/vue';
import {
  SelectOption,
  SelectOptionsPlacement,
  SelectSize,
  SelectValue,
} from './types';
import { useSearch } from './useSearch';
import { selectButtonSizeStyles, selectOptionsSizeStyles } from './styles';
import SelectButton from './SelectButton.vue';
import SelectOptionsBox from './SelectOptionsBox.vue';
import { randomId } from '../utils/random';
import { useFloatingUi } from '../utils/useFloatingUi';
import {
  emptyValueOption,
  addNewValueOption,
  unknownValueLabel,
} from './utils';

const emit = defineEmits(['change']);

// Handle input props
const props = withDefaults(
  defineProps<{
    options?: SelectOption[];
    value?: SelectValue;
    size?: SelectSize;
    id?: string;
    // Show the search box if there are at least this amount of options (default 7)
    // - set this number to zero to always show the search
    // - set this number to Infinity to always hide the search
    showSearchWhenAtLeastCountOptions?: number;
    showEmptyValue?: boolean;
    showAddNewValue?: boolean;
    showValueAsLabelFallback?: boolean;
    zIndex?: number;
  }>(),
  {
    options: () => [],
    value: undefined,
    size: SelectSize.md,
    id: randomId(),
    showSearchWhenAtLeastCountOptions: 7,
    showEmptyValue: false,
    showAddNewValue: false,
    showValueAsLabelFallback: false,
    zIndex: undefined,
  }
);
const {
  options,
  value,
  size,
  showEmptyValue,
  showAddNewValue,
  showValueAsLabelFallback,
  showSearchWhenAtLeastCountOptions,
} = toRefs(props);

const valueInternal = ref(value.value);

watch(value, (v) => (valueInternal.value = v));
watch(valueInternal, (v) => emit('change', v));

// Compute internal options array. If showEmptyValue is set,
// then a "no value" option is added to the front of the list
const optionsInternal = computed<SelectOption[]>(() => {
  let data = [];

  if (showAddNewValue.value) {
    data.push(addNewValueOption());
  }

  if (showEmptyValue.value) {
    data.push(emptyValueOption());
  }

  return [...data, ...options.value];
});

// Compute selected label:
// - show selected option if such an option exists
// - show "unknown value" if no option corresponds to the current value
const selectedLabel = computed(() => {
  const selectedOption = optionsInternal.value.find(
    (option) =>
      option.value === valueInternal.value ||
      (option.value == null && valueInternal.value == null)
  );

  if (selectedOption != null) {
    return selectedOption.label;
  }

  if (showValueAsLabelFallback.value) {
    return valueInternal.value as string;
  }

  return unknownValueLabel(valueInternal.value);
});

// Handle options placement
const isBottomPlacement = computed(
  () =>
    placement.value === 'bottom-start' ||
    placement.value === 'bottom-end' ||
    placement.value === 'bottom'
);
const optionsPlacement = computed<SelectOptionsPlacement>(() =>
  isBottomPlacement.value ? 'bottom' : 'top'
);

// Compute CSS classes based on size and option placement
const buttonClassNames = computed(() => selectButtonSizeStyles[size.value]);
const optionsClassNames = computed(
  () => selectOptionsSizeStyles[size.value][optionsPlacement.value]
);

// Position options container dynamically
const [trigger, container, placement] = useFloatingUi({
  placement: 'bottom-start',
  matchReferenceWidth: true,
});

// Handle search
const showSearch = computed(
  () => optionsInternal.value.length >= showSearchWhenAtLeastCountOptions.value
);
const { searchTerm, searchResults } = useSearch(optionsInternal);
</script>
