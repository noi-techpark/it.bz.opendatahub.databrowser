<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <InputWithButton
    :id="id"
    :model-value="modelValue"
    :disabled="disabled"
    :focus="focus"
    :label-placeholder="t('components.inputSearch.labelPlaceholder')"
    @update:model-value="emit('update:modelValue', $event)"
    label-button="Search"
    :show-icon-in-button="false"
    :show-button-text-mobile="true"
    show-icon
    @confirmed-value="emit('search', $event)"
  >
    <template #icon>
      <IconSearch class="text-green-500 w-4 h-4" />
    </template>
  </InputWithButton>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconSearch from '../svg/IconSearch.vue';
import InputWithButton from './InputWithButton.vue';

const { t } = useI18n();

const emit = defineEmits(['search', 'update:modelValue']);

withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    focus?: boolean;
    id?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: undefined,
    focus: undefined,
    id: undefined,
  }
);
</script>
