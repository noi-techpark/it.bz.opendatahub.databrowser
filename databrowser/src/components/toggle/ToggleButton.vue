<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom
    size="xs"
    :variant="Variant.ghost"
    class="px-2 py-1"
    :class="[
      {
        'border-green-500 bg-green-500/10 focus:bg-green-500/10 focus:text-green-500':
          enabled && !disabled,
      },
      { 'bg-transparent focus:bg-transparent focus:text-green-500': !enabled },
      {
        'border-green-500 bg-green-500/40 text-black': enabled && disabled,
      },
    ]"
    :disabled="disabled"
    @click="enabled = !enabled"
  >
    <slot></slot>
  </ButtonCustom>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { Variant } from '../button/types';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{ modelValue?: boolean; disabled?: boolean }>(),
  {
    modelValue: true,
    disabled: false,
  }
);

const { modelValue, disabled } = toRefs(props);

const enabled = computed({
  get: () => modelValue.value,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>
