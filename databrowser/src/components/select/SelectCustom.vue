<template>
  <div>
    <Listbox v-slot="{ open }" v-model="selectedOption">
      <div class="relative text-green-500">
        <ListboxButton
          ref="trigger"
          class="relative pr-9 pl-3 w-full leading-tight text-left focus:text-white focus:bg-green-500 rounded border"
          :class="[
            open ? 'bg-green-500 text-white' : 'bg-white text-green-500',
            classNames,
          ]"
        >
          <span class="block">{{ selectedOption?.label }}</span>
          <span
            class="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none"
          >
            <IconStrokedArrowDown v-if="!open" class="w-5 h-5 stroke-current" />
            <IconStrokedArrowUp v-else class="w-5 h-5 stroke-current" />
          </span>
        </ListboxButton>

        <Teleport to="body">
          <div
            ref="container"
            class="overflow-auto z-20 max-h-60 rounded ring-1 ring-gray-400 shadow-md"
          >
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <ListboxOptions class="text-base bg-white">
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
                      'relative cursor-pointer select-none pl-4 pr-8 py-1',
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
        </Teleport>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  ref,
  watch,
  withDefaults,
} from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import IconStrokedArrowDown from '../svg/IconStrokedArrowDown.vue';
import IconStrokedArrowUp from '../svg/IconStrokedArrowUp.vue';
import { SelectOption, SelectSize } from './types';
import { usePopper } from '../utils/usePopper';

const [trigger, container] = usePopper({
  placement: 'bottom-start',
  strategy: 'absolute',
  modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
});

const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    size?: SelectSize;
  }>(),
  {
    options: () => [],
    size: SelectSize.sm,
  }
);

const selectSizeStyles: Record<SelectSize, string> = {
  [SelectSize.sm]: 'h-6',
  [SelectSize.md]: 'h-10',
};

const classNames = computed(() => selectSizeStyles[props.size as SelectSize]);

const getSelectedOption = (options: SelectOption[]) =>
  options.find((option) => option.selected) ?? options[0] ?? undefined;

const selectedOption = ref(getSelectedOption(props.options));

watch(
  () => props.options,
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
