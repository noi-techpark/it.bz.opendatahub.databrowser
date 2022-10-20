<template>
  <div>
    <Listbox v-slot="{ open }" v-model="selectedOption">
      <div class="relative text-black">
        <SelectButton
          :id="id"
          :open="open"
          :class-names="classNames"
          :selected-option="selectedOption"
          :is-bottom-placement="true"
        />
        <SelectOptionsBox
          v-model="searchTerm"
          :show-search="showSearch"
          :search-results="searchResults"
          :is-bottom-placement="true"
          :class="{ hidden: !open }"
          class="absolute z-20 w-full border-t-0"
        />
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import { Listbox } from '@headlessui/vue';
import { SelectOption, SelectSize } from './types';
import { useEmitChange } from './useEmitChange';
import { useSearch } from './useSearch';
import { useSelectedOption } from './useSelectedOption';
import { selectSizeStyles } from './styles';
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
  }>(),
  {
    options: () => [],
    size: SelectSize.sm,
    id: randomId(),
    showSearchWhenAtLeastCountOptions: 7,
  }
);
const { options, size, showSearchWhenAtLeastCountOptions } = toRefs(props);

// Compute selected option
const selectedOption = useSelectedOption(options);

// Compute CSS classes based on size
const classNames = computed(() => selectSizeStyles[size.value]);

// Handle search
const showSearch = computed(
  () => options.value.length >= showSearchWhenAtLeastCountOptions.value
);
const { searchTerm, searchResults } = useSearch(options);

// Emit change event if selection changes
const emit = defineEmits(['change']);
useEmitChange(emit, selectedOption);
</script>
