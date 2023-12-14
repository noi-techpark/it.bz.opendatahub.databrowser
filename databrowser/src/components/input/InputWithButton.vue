<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="flex items-center justify-between gap-2 rounded border border-gray-400 p-2 text-black focus-within:border-green-500"
  >
    <input
      :id="id"
      ref="inputRef"
      v-model="text"
      class="grow"
      :placeholder="labelPlaceholder"
      :disabled="disabled"
      :data-test="`${id}-input`"
      @keypress.enter="emitConfirmedValue"
    />
    <div class="flex items-center gap-2">
      <button
        v-if="hasText"
        class="p-[3px] text-delete"
        :data-test="`${id}-reset-search`"
        :disabled="disabled"
        @click="deleteText"
      >
        <IconDelete />
      </button>
      <ButtonCustom
        v-if="showConfirmButton"
        class="-m-1 flex items-center gap-2 rounded p-2 md:px-3 md:py-1"
        aria-label="Search"
        :size="Size.xs"
        :disabled="disabled"
        :data-test="`${id}-start-search`"
        @click="emitConfirmedValue"
      >
        <slot name="icon"></slot>
        <span class="hidden md:inline">{{ labelButton }}</span>
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { Size } from '../button/types';
import IconDelete from '../svg/IconDelete.vue';
import { randomId } from '../utils/random';

const emit = defineEmits(['confirmedValue', 'update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    focus?: boolean;
    id?: string;
    labelButton?: string;
    labelPlaceholder?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: undefined,
    focus: undefined,
    id: randomId(),
    labelButton: undefined,
    labelPlaceholder: undefined,
  }
);

const text = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => (text.value = value)
);

watch(
  () => text.value,
  (value) => emit('update:modelValue', value)
);

const inputRef = ref();
const focusInput = () =>
  setTimeout(() => {
    if (inputRef.value != null) {
      inputRef.value.focus();
    }
  }, 500);

onMounted(() => {
  if (props.focus === true) {
    focusInput();
  }
});

const hasText = computed(() => text.value?.length ?? 0 > 0);

const deleteText = () => {
  text.value = '';
  emitConfirmedValue();
  focusInput();
};

const emitConfirmedValue = () => emit('confirmedValue', text.value);

const slots = useSlots();
const showConfirmButton = computed(
  () => props.labelButton != null || slots['icon'] != null
);
</script>
