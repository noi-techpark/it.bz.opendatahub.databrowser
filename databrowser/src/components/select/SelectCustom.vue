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
          :label="selectedLabel"
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
import { useSearch } from './useSearch';
import { selectButtonSizeStyles, selectOptionsSizeStyles } from './styles';
import SelectButton from './SelectButton.vue';
import SelectOptionsBox from './SelectOptionsBox.vue';
import { randomId } from '../utils/random';

const NO_VALUE_OPTION = {
  label: '--- NO VALUE ---',
  value: undefined,
} as const;

const emit = defineEmits(['change']);

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
    showNoValue?: boolean;
    unknownValue?: string;
  }>(),
  {
    options: () => [],
    size: SelectSize.sm,
    id: randomId(),
    showSearchWhenAtLeastCountOptions: 7,
    optionsPlacement: 'bottom',
    showNoValue: false,
    unknownValue: undefined,
  }
);
const {
  options,
  size,
  showSearchWhenAtLeastCountOptions,
  optionsPlacement,
  unknownValue,
} = toRefs(props);

// Compute selected option and emit if selection changes
const selectedOption = computed({
  get: () => optionsInternal.value.find((option) => option.selected),
  set: (option) => emit('change', option?.value),
});

// Compute internal options array. If showNoValue is set, then a "no value"
// option is added to the front of the list
const optionsInternal = computed<SelectOption[]>(() =>
  props.showNoValue ? [NO_VALUE_OPTION, ...options.value] : options.value
);

// Compute selected label:
// - show selected option if such an option exists
// - show "no value" if the prop unknownValue is null / undefined
// - show "unknown value" + unknownValue if the prop unknownValue is set
const selectedLabel = computed(() => {
  if (selectedOption.value != null) {
    return selectedOption.value.label;
  }

  return props.unknownValue == null
    ? NO_VALUE_OPTION.label
    : `--- Unknown value (${unknownValue.value}) ---`;
});

// Handle options placement
const isBottomPlacement = computed(() => optionsPlacement.value === 'bottom');

// Compute CSS classes based on size and option placement
const buttonClassNames = computed(() => selectButtonSizeStyles[size.value]);
const optionsClassNames = computed(
  () => selectOptionsSizeStyles[size.value][optionsPlacement.value]
);

// Handle search
const showSearch = computed(
  () => optionsInternal.value.length >= showSearchWhenAtLeastCountOptions.value
);
const { searchTerm, searchResults } = useSearch(optionsInternal);
</script>
