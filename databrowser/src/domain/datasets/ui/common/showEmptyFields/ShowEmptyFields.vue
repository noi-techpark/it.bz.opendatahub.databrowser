<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseSettingsToggle
    :label="t('datasets.detailView.showEmptyFields')"
    :description="
      hasDescription ? t('datasets.detailView.showEmptyFieldsDesc') : ''
    "
    active-color-class="red-500"
    :active="!!toolBoxStore.settings.showAll"
    :custom-text-classes="customTextClasses"
    :use-container-classes="useContainerClasses"
  >
    <template #toggle>
      <ToggleCustom
        v-model="toolBoxStore.settings.showAll"
        :disabled="disabled"
        active-bg-class="bg-red-400"
        active-border-class="border-red-400"
        inactive-bg-class="bg-gray-400"
        inactive-border-class="border-gray-400"
        class="shrink-0"
        data-test="show-empty-fields" /></template
  ></BaseSettingsToggle>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';

import BaseSettingsToggle from '../BaseSettingsToggle.vue';

const toolBoxStore = useToolBoxStore();

const { t } = useI18n();

withDefaults(
  defineProps<{
    disabled?: boolean;
    hasDescription?: boolean;
    useContainerClasses?: boolean;
    customTextClasses?: string;
  }>(),
  {
    disabled: false,
    hasDescription: false,
    useContainerClasses: true,
    customTextClasses: '',
  }
);
</script>
