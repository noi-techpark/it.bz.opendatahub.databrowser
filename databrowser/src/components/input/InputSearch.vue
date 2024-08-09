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
    show-button-on-left
    @update:model-value="emit('update:modelValue', $event)"
    @confirmed-value="emit('search', $event)"
  >
    <template #icon>
      <IconSearch />
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
