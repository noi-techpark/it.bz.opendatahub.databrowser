<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <InputWithButton
    :focus="focus"
    :label-button="t('components.inputFilter.labelButton')"
    :label-placeholder="t('components.inputFilter.labelPlaceholder')"
    @confirmed-value="emit('filter', $event)"
  >
    <template #icon>
      <IconFilter />
    </template>
  </InputWithButton>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconFilter from '../svg/IconFilter.vue';
import InputWithButton from './InputWithButton.vue';

const { t } = useI18n();

const emit = defineEmits(['filter', 'update:modelValue']);

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
