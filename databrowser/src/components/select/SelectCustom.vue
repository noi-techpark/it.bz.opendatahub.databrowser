<template>
  <div>
    <Listbox v-slot="{ open }" v-model="selectedOption">
      <div class="relative text-green-500">
        <ListboxButton
          class="relative pr-9 pl-3 w-full h-6 leading-tight text-left focus:text-white focus:bg-green-500 rounded border"
          :class="[
            open ? 'bg-green-500 text-white' : 'bg-white text-green-500',
          ]"
        >
          <span class="block uppercase">{{ selectedOption?.label }}</span>
          <span
            class="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none"
          >
            <StrokedArrowDown v-if="!open" class="w-5 h-5 stroke-current" />
            <StrokedArrowUp v-else class="w-5 h-5 stroke-current" />
          </span>
        </ListboxButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ListboxOptions
            class="overflow-auto absolute z-20 mt-2 w-full max-h-60 text-base bg-white rounded shadow-md origin-top-right"
          >
            <ListboxOption
              v-for="option in options"
              v-slot="{ active, selected }"
              :key="option.label"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active || selected ? 'bg-gray-50' : '',
                  'relative cursor-pointer select-none px-2 py-1',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold bg-gray-50' : '',
                    'block uppercase',
                  ]"
                >
                  {{ option.label }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  ref,
  toRefs,
  unref,
  watch,
  withDefaults,
} from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import StrokedArrowDown from '../svg/StrokedArrowDown.vue';
import StrokedArrowUp from '../svg/StrokedArrowUp.vue';
import { SelectOption } from './types';

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
  }>(),
  {
    options: () => [],
  }
);
const { options } = toRefs(props);

const getSelectedOption = (options: SelectOption[]) =>
  options.find((option) => option.selected) ?? options[0] ?? undefined;

const selectedOption = ref(getSelectedOption(unref(options)));

watch(
  () => options.value,
  (options) => (selectedOption.value = getSelectedOption(options))
);

const emit = defineEmits(['change']);

watch(
  () => selectedOption.value,
  (newOption, oldOption) => {
    if (newOption.value !== oldOption.value) {
      // Wait a bit before emitting the value such that the listbox options container can hide
      setTimeout(() => emit('change', newOption.value ?? newOption.label), 50);
    }
  }
);
</script>
