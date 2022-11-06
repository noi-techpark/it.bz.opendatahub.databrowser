<template>
  <div>
    <Listbox v-slot="{ open }" v-model="selectedOption">
      <div class="relative text-black">
        <SelectButton
          :id="id"
          :class="[
            !open ? 'rounded' : isBottomPlacement ? 'rounded-t' : 'rounded-b',
            buttonClassNames,
          ]"
          :selected-option="selectedOption"
        />
        <SelectOptionsBox
          v-model="searchTerm"
          :show-search="showSearch"
          :search-results="searchResults"
          :class="[{ hidden: !open }, optionsClassNames]"
          class="absolute z-20 w-full"
        />
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import { Listbox } from '@headlessui/vue';
import { SelectOption, SelectOptionsPlacement, SelectSize } from './types';
import { useEmitChange } from './useEmitChange';
import { useSearch } from './useSearch';
import { useSelectedOption } from './useSelectedOption';
import { selectButtonSizeStyles, selectOptionsSizeStyles } from './styles';
import SelectButton from './SelectButton.vue';
import SelectOptionsBox from './SelectOptionsBox.vue';
import { randomId } from '../utils/random';

// Handle input props
const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    size?: SelectSize;
    id?: string;
    // Show the search box if there are at least this amount of options (default 7)
    // Set this number to zero to always show the search
    // Set this number to Infinity to always hide the search
    showSearchWhenAtLeastCountOptions?: number;
    optionsPlacement?: SelectOptionsPlacement;
  }>(),
  {
    options: () => [],
    size: SelectSize.sm,
    id: randomId(),
    showSearchWhenAtLeastCountOptions: 7,
    optionsPlacement: 'bottom',
  }
);
const { options, size, showSearchWhenAtLeastCountOptions } = toRefs(props);

// Compute selected option
const selectedOption = useSelectedOption(options);

// Handle options placement
const isBottomPlacement = computed(() => props.optionsPlacement === 'bottom');

// Compute CSS classes based on size and option placement
const buttonClassNames = computed(() => selectButtonSizeStyles[size.value]);
const optionsClassNames = computed(
  () => selectOptionsSizeStyles[size.value][props.optionsPlacement]
);

// Handle search
const showSearch = computed(
  () => options.value.length >= showSearchWhenAtLeastCountOptions.value
);
const { searchTerm, searchResults } = useSearch(options);

// Emit change event if selection changes
const emit = defineEmits(['change']);
useEmitChange(emit, selectedOption);
</script>
